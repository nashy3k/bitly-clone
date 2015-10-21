require_relative '../../config/database'
require 'SecureRandom'

class Url < ActiveRecord::Base
	before_create :shorten_url


	def shorten_url
		random_string = SecureRandom.urlsafe_base64(4)
		self.short_url = random_string
	end



end
