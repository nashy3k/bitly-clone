get '/' do
	@url = Url.all
  	erb :"static/index"
end

post '/urls' do
	#create a new Url
	@url = Url.new(long_url: params[:long_url])
	@url.save
	redirect to '/'
end

#i.e. /6bq
get '/:short_url' do
	@url=Url.find_by(short_url: params[:short_url])

	#redirect to appropiate 'long' url
	redirect to @url.long_url
end
