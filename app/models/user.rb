class User < ActiveRecord::Base
  require 'net/ldap'
  require 'mechanize'
  
  # Associations
 
  # Validations
  validates_uniqueness_of :email, :message => "Conflicting email address."
 
  # Callbacks
  # after_create :populateLDAP
  after_create :method_callback
    
  # Accessors 
  def name
    self.fname.capitalize + " " + self.lname.split("-").map(&:capitalize).join("-")
  end

  def collegeName
    colleges = Hash["" => "", "BK" => "Berkeley", "BR" => "Branford", "CC" => "Calhoun", 
                    "DC" => "Davenport", "ES" => "Ezra Stiles", "JE"=> "Jonathan Edwards", 
                    "MC" => "Morse",  "PC" => "Pierson", "SY" => "Saybrook", 
                    "SM" => "Silliman", "TD" => "Timothy Dwight", "TC" => "Trumbull"]
    colleges[self.college]
  end

  def collegeURL
    collegeURLs = Hash["" => "", "BK" => "berkeley", "BR" => "branford", "CC" => "calhoun", 
                    "DC" => "davenport", "ES" => "ezra-stiles", "JE"=> "jonathan-edwards", 
                    "MC" => "morse",  "PC" => "pierson", "SY" => "saybrook", 
                    "SM" => "silliman", "TD" => "timothy-dwight", "TC" => "trumbull"]
    collegeURLs[self.college]
  end

  def graduationYear
    self.year
  end

  def studentEmail
    self.email
  end

  def studentNetid
    self.netid
  end
  
 
protected

  def method_callback
    User.get_user(netid)
  end
 
  #populate contact fields from LDAP
  def populateLDAP
    #quit if no email or netid to work with
    self.email ||= ''
    return if !self.email.include?('@yale.edu') && !self.netid
 
    begin
      ldap = Net::LDAP.new( :host =>"directory.yale.edu" , :port =>"389" )
 
      #set e filter
      if !self.email.blank?
        f = Net::LDAP::Filter.eq('mail', self.email)
      else #netid
        f = Net::LDAP::Filter.eq('uid', self.netid)
      end
 
      b = 'ou=People,o=yale.edu'
      p = ldap.search(:base => b, :filter => f, :return_result => true).first
    
    rescue Exception => e
          logger.debug :text => e
          logger.debug :text => "*** ERROR with LDAP"
          guessFromEmail
    end
  
    self.netid = ( p['uid'] ? p['uid'][0] : '' )
    self.fname = ( p['knownAs'] ? p['knownAs'][0] : '' )
    if self.fname.blank?
      self.fname = ( p['givenname'] ? p['givenname'][0] : '' )
    end
    self.lname = ( p['sn'] ? p['sn'][0] : '' )
    self.email = ( p['mail'] ? p['mail'][0] : '' )
    self.year = ( p['class'] ? p['class'][0].to_i : 0 )
    self.college = ( p['college'] ? p['college'][0] : '' )
    self.save!
    p self
  end

  def User.get_user netid
    # p netid
    email_regex = /^\s*Email Address:\s*$/i
    year_regex = /^\s*Class Year:\s*$/i
    college_regex = /^\s*Residential College:\s*$/i
    name_regex = /^\s*Name:\s*$/i
    browser = User.make_cas_browser
    browser.get("http://directory.yale.edu/phonebook/index.htm?searchString=uid%3D#{netid}")
    u = nil
    browser.page.search('tr').each do |tr|
      # puts "tr!"
      field = tr.at('th').text
      value = tr.at('td').text.strip
      case field
        when email_regex
          u = User.where(netid: netid).first
          if u
            u.email = value
            u.save
          end
        when year_regex
          u = User.where(netid: netid).first
          if u
            u.year = value
            u.save
          end
        when college_regex
          u = User.where(netid: netid).first
          if u
            u.college = value
            u.save
          end
        when name_regex
          u = User.where(netid: netid).first
          if u
            name = value.split(" ")
            u.fname = name[0]
            u.lname = name[name.length - 1]
            u.save
          end 
      end
    end
    u = User.where(netid: netid).first
    p u
    u
  end

  def User.make_cas_browser
    browser = Mechanize.new
    browser.get( 'https://secure.its.yale.edu/cas/login' )
    form = browser.page.forms.first
    form.username = ENV['CAS_NETID']
    form.password = ENV['CAS_PASS']
    form.submit
    browser
  end

 
end