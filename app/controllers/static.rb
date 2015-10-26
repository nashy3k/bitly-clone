get '/' do
	@urls = Url.all
  	erb :"layout"
end

post '/urls' do
	#create a new Url
	@url = Url.new(long_url: params[:long_url])
	if @url.save
		redirect to '/'
	else
		@urls = Url.all
		erb :"layout"
	end
end

#i.e. /6bq
get '/:short_url' do
	@url=Url.find_by(short_url: params[:short_url])
	@url.counting
	#redirect to appropiate 'long' url
	#redirect to "http://#{@url.long_url}"
	redirect to @url.long_url
end
