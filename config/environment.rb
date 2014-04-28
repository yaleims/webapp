# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
CasYaleims::Application.initialize!

CASClient::Frameworks::Rails::Filter.configure(
  :cas_base_url => "https://secure.its.yale.edu/cas/",
  :username_session_key => :cas_user,
  :extra_attributes_session_key => :cas_extra_attributes
)

