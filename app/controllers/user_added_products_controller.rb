class UserAddedProductsController < ApplicationController
  
  before_action :login_required

  def new
    @user_product = UserAddedProduct.new
  end

  def create
    @user_product = UserAddedProduct.new(product_params)

    if @user_product.save
      @current_user.user_added_products << @user_product
      redirect_to user_added_products_path
    else 
      render :new
    end
  end

  def index
    @products = current_user.user_added_products
  end

  def edit
    @user_product = UserAddedProduct.find(params[:id])
  end

  def update
    @user_product = UserAddedProduct.find(params[:id])
    if @recipient = Recipient.find_by(:email => params[:user_added_product][:recipients_attributes][:"0"][:email])
      @user_product.recipients << @recipient
    else 
      @recipient = Recipient.new(recipient_params)
      @user_product.assign_attributes(product_params)
    end
    if @user_product.save
      redirect_to user_added_product_path
    else
      flash.now[:notice] = "Your submission is invalid."
      render "edit" 
    end
  end
   
  def destroy
    @user_product = UserAddedProduct.find(params[:id])
    @user_product.destroy
    redirect_to user_added_products_path
  end

  def show
    @user_product = UserAddedProduct.find(params[:id])


    @time_add = @user_product.number_unit_of_time.to_i
    @time_type = @user_product.unit_of_time_period

    @product_exp = @user_product.created_at
    
    if @time_type =~ /\bday(s|\(s\))?/i
      @exp_date = @product_exp + @time_add.days
    elsif @time_type =~ /\bweek(s|\(s\)?)/i
      @exp_date = @product_exp + @time_add.weeks
    elsif @time_type =~ /\bmonth(s|\(s\)?)/i
      @exp_date = @product_exp + @time_add.months
    elsif @time_type =~ /\byear(s|\(s\)?)/i
      @exp_date = @product_exp + @time_add.years
    else
      @exp_date = @user_product.unit_of_time_period
    end

  end

  private

  def product_params
    params.require(:user_added_product).permit(:name, :product_details, :unit_of_time_period, :number_unit_of_time,:storage, :recipients_attributes =>[:name, :email, :phone_number])
  end

  def recipient_params
    params[:recipients] = params[:user_added_product][:recipients_attributes]["0"]
    params.require(:recipients).permit!
  end 
end
