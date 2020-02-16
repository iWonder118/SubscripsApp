module ControllerMacros
  def login_admin(admin)
    @request.env["devise.mapping"] = Devise.mappings[:admin]
    sign_in admin
  end
  module ControllerMacros
    def login_admin(admin)
      @request.env["devise.mapping"] = Devise.mappings[:admin]
      sign_in admin
    end
  end
end
