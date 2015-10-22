require_relative '../../config/database'
require 'SecureRandom'

class Url < ActiveRecord::Base
	before_create :shorten_url

	validates :long_url, presence: true, uniqueness: true #:format => URI::regexp(%w(http https))
	# :format => {:with => /\A[h][t][t][p][s]?[:][\/][\/]/, :message => "not http/s"}  
	# validate :uri_format, on: :create
	validate :uri_suffix, on: :create

	def shorten_url
		random_string = SecureRandom.urlsafe_base64(4)
		self.short_url = random_string
	end

	def counting
		self.click_count += 1
		self.save
	end

	def check_suffix?
  	uri = URI.parse(self.long_url)	# |
		begin
  		uri.kind_of?(URI::HTTP)
  	rescue URI::InvalidURIError => msg
  		puts msg
			@x = msg
  	  false
  	end

  	begin
  		PublicSuffix.parse(uri.host) # |
		rescue PublicSuffix::DomainNotAllowed => msg
			puts msg
			@x = msg
		  false
		rescue PublicSuffix::DomainInvalid => msg
			puts msg
			@x = msg
			false
		rescue PublicSuffix::Error => msg
			puts msg
			@x = msg
			false
		end
	end

	def uri_suffix

		unless check_suffix?
			errors.add(:long_url, "PublicSuffix fails") 
		end
	end
end


	# def check_format?
	# 	begin
 #  		uri = URI.parse(self.long_url)
 #  		uri.kind_of?(URI::HTTP)
 #  		return true
	# 	rescue URI::InvalidURIError => msg
	# 	 #@m = msg
	# 	end
	# 	false
	# end

	# def uri_format
	# 	unless check_format?
	# 	 errors.add(:long_url, msg+"check_format fail http/s") 	
	# 	end
	# end
