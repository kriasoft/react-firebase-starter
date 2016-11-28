
## How to use with Bootstrap  

By default all is configured to use Material Design Lite from Google.
 Bootstrap is another styling framework that many can prefer.  
Since we use Webpack and CSS modules, just adding Bootstrap's CSS won't work; 
one needs to configure an extra loader.  

#### 1. Install dependencies:      

    npm install --save jquery bootstrap-sass   # v3      
    npm install --save-dev css-loader node-sass resolve-url-loader sass-loader style-loader url-loader     
    npm install --save-dev extract-text-webpack-plugin     
    npm install --save-dev bootstrap-loader  
    
#### 2. Add an entry point to `webpack.config.js`:      
    
    const config = {       
      ...       
      entry: [         
        'bootstrap-loader',         
        ...         
        'main.js',       
      ],        

#### 3. Add a plugin to `webpack.config.js`:

  We need to load jQuery before loading Bootstrap.           

    const config = {        
      ...       
      plugins: [         
        ...         
        new webpack.ProvidePlugin({           
          jQuery: 'jquery'         
        }),       
      ],        
      
 
#### 4. Test that it works:  

Add a paragraph with a Bootstrap theme:      

    <p className="bg-success">TEST</p>      
    
It should be green. 
