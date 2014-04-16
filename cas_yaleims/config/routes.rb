CasYaleims::Application.routes.draw do
 root 'main#index'
 get '/logout' => 'main#logout'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end


   namespace :api, defaults: {format: :json} do
    
    # API Version 1
    namespace :v1 do

      # Patient Authentication
      scope '/users' do
        get '/me', to: 'userdata#me'
        #post '/authenticate', to: 'userdata#authenticate'
      end

      # Resources
      resources :userdata
                
    end
  end


  # Whitelisted Routes
  get '/home', to: 'main#index'
  get '/newsfeed', to: 'main#index'
  get '/leaderboard', to: 'main#index'
  get '/sport', to: 'main#index'
  get '/sport/:sport', to: 'main#index'
  get '/college/:college', to: 'main#index'
  get '/college/:college/:sport', to: 'main#index'
  get '/admin', to: 'main#index'
  get '/profile', to: 'main#index'
  get '/logout', to: 'main#logout'
end
