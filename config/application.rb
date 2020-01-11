require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SubscripsApp
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2
    config.generators do |g|
      g.javascripts false
      g.stylesheets false
      g.skip_routes false        # trueなら routes.rb変更せず
      g.helper false             # ヘルパー生成せず
      g.test_framework :rspec,   # テストフレームワークはrspecを使用の場合
                        view_specs: false,
                        helper_specs: false,
                        routing_specs: false,
                        request_specs: false,
                        fixtures: true
      g.fixture_replacement :factory_bot, dir: "spec/factories" # fixtureはfactory_botでディレクトリを変更
    end
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    config.time_zone = 'Tokyo'
    config.i18n.default_locale = :ja
    config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.{rb,yml}').to_s]
    config.action_view.automatically_disable_submit_tag = false
  end
end
