
namespace :scraping do
  desc "Scrape EatByDate.com and save to Products table"
  task :eat => :environment do
  	scraper = EatByDateScraper.new
		scraper.save_all_charts_to_active_record
  end
end

