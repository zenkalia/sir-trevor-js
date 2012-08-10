
var template = '<p>Drop tweet link here</p><div class="input text"><label>or paste URL:</label><input type="text" class="paste-block"></div>';
var tweet_template = '<div class="tweet media"><div class="img"><img src="<%= user.profile_image_url %>" class="tweet-avatar"></div><div class="bd tweet-body"><p><a href="http://twitter.com/#!/<%= user.screen_name %>">@<%= user.screen_name %></a>: <%= text %></p><time><%= created_at %></time></div></div>';

SirTrevor.BlockTypes.Tweet = new SirTrevor.BlockType({ 
  
  title: "Tweet",
  className: "tweet",
  toolbarEnabled: true,
  dropEnabled: true,
  limit: 0,
  
  editorHTML: "<div></div>",
  
  dropzoneHTML: template,
  
  validate: function() {},
  
  loadData: function(data){
    this.$block.find(".dropzone").hide();
    this.$el.show();
    this.$el.html(_.template(tweet_template, data));
  },
  
  onContentPasted: function(event){
    // Content pasted. Delegate to the drop parse method
    var input = $(event.target),
        val = input.val();
    
    // Validate the URL
    
    // Pass to the 'onDrop' function
    this._super("onDrop", val);
  },

  onDrop: function(transferData){
    var url = transferData.getData('text/plain');
    
    if(_.isURI(url)) 
    {
      if (url.indexOf("twitter") != -1 && url.indexOf("status") != -1) {
        // Twitter status
        var tweetID = url.match(/[^\/]+$/);
        if (!_.isEmpty(tweetID)) {
          
          this.loading();
          
          tweetID = tweetID[0];
          
          var tweetCallbackSuccess = function(data) {
            // Parse the twitter object into something a bit slimmer..
            var obj = {
              user: {
                profile_image_url: data.user.profile_image_url,
                profile_image_url_https: data.user.profile_image_url_https,
                screen_name: data.user.screen_name,
                name: data.user.name
              },
              text: data.text,
              created_at: data.created_at,
              status_url: url
            };
            
            // Save this data on the block
            var dataStruct = this.$el.data('block');
            dataStruct.data = obj;
            
            this.$el.html(_.template(tweet_template, obj)); // Render
            this.$dropzone.hide();
            this.$el.show();
            
            this.ready();
          };

          var tweetCallbackFail = function(){
            this.ready();
          };
          
          // Make our AJAX call
          $.ajax({
            url: "http://api.twitter.com/1/statuses/show/" + tweetID + ".json",
            dataType: "JSONP",
            success: _.bind(tweetCallbackSuccess, this),
            error: _.bind(tweetCallbackFail, this)
          });
        }
      }
    }
  }
});