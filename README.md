# README

This is a carbon copy of Child Mackenzie Reddit clone tutorial. This readme is to capture the differences in its creation since the original tutorial was created. This included starting with a PostgreSQL database and using Bulma as the CSS framework.

**NOTE** create a seed file to generate a test_user with login credentials

Start a new rails app with the following commands

```
rails new -c=bulma -d=postgresql
```

`rails new` creates a new rails app. The flag `-c` stands for css, rails will use the framework Bulma to process the CSS and deliver it via the asset pipeline in rails. The flag `-d` stands for database, rails will use the postgresql database store data.

## We are building a reddit clone!

### Requirements for our site:

- Users need to be able to sign-up, sign-in and sign-out
- Signed-in users will need to be able to submit a link with a title and a URL
- Users will be able to vote up or down on the link submissions
- Users will be able to comment on link submissions

## Link Submissions

---

**NOTE**

We will be using git to document our work.

---

We will create a new branch and work on the link submission feature.

```
git checkout -b feature/link_scaffold
```

Using the command `git checkout` allows us to switch to a different branch on the repo. Using the flag
`-b` creates a new branch and the last argument is the name if the new branch. If we tried to run `git checkout new_branch_name` we would return the following error.

```
>> error: pathspec 'new_branch_name' did not match any file(s) known to git
```

We will generate a scaffold for the link submission:

```
rails g scaffold link title:string url:string
```

Migrate the database we created with the scaffold:

```
rails db:migrate
```

And then let’s run the rails server to check out our work:

```
rails server
```

Create a new link to test that everything is working.

Excellent. Everything is functioning.

Next we will commit our changes and merge our git branch into the git master branch:

Kill the server: `ctrl + c`. Then execute each git command individually in your terminal. Write it out rather than copy/paste; you’ll want to commit these commands to memory.

```
git status
git add .
git commit -m "generated link scaffold"
git checkout main
git merge feature/link_scaffold
git push
```

## Creating Users

By creating users, we will have the ability to sign-up, sign-in and sign-out. We will be using the devise gem to help us add user authentication into our app.

First we are going to create a new branch in our github repository:

```
git checkout -b add_users
```

“Switched to a new branch ‘add_users’

Next, we will actually add the devise gem to our gemfile. Navigate to the Ruby devise gem page and copy the gemfile:

```
gem 'devise', '~> 4.4', '>= 4.4.1'
```

Open the gem file in your text editor, and add the above line of code into the gemfile.

Run

```
bundle install
```

Next, we’ll finish installing devise:

```
rails g devise:install
```

You’ll see the following in your command line:
**image**

Let’s complete setup.

First, add the following to config/environments/development.rb:

```
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
```

Save the file.

Second, add a root to your routes.rb file. I’m going to make the root the links index page:

Before:

```ruby
Rails.application.routes.draw do
  resources :links
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
```

After:

```ruby
Rails.application.routes.draw do
  resources :links
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
root:'links#index'
end
```

Restart the server and go to Got to http://localhost:3000/

Awesome it worked!

Third piece of the devise gem install: Ensure you have flash messages in `app/views/layouts/application.html.erb`.

Mackenzie improvises a bit here, and uses some code that will work with the bootstrap code that we will add later. We’ll follow along with him.

Add the following to app/views/layouts/application.html.erb:
**NOTE** explain why we are doing this!!!

```ruby
<% flash.each do |name, msg| %>
    <%= content_tag(:div, msg, class: "alert alert-#{name}") %>
   <% end %>
```

Before:

```ruby
<!DOCTYPE html>
<html>
  <head>
    <title>CarbonReddit</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
    <%= javascript_include_tag "application", "data-turbo-track": "reload", defer: true %>
  </head>

  <body>
    <%= yield %>
  </body>
</html>
```

After:

```ruby
<!DOCTYPE html>
<html>
  <head>
    <title>CarbonReddit</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
    <%= javascript_include_tag "application", "data-turbo-track": "reload", defer: true %>
  </head>

  <body>
    <% flash.each do |name, msg| %>
      <%= content_tag(:div, msg, class: "alert alert-#{name}") %>
    <% end %>

  <%= yield %>
  </body>
</html>
```

Next, we’re going kill the server (ctrl +c), and then run:

```
rails g devise:views
```

Great. Now we can generate a user.

```
bin/rails g devise User
```

Then, migrate the database:

```
bin/rails db:migrate
```

Now we can create a user on our web app.

Restart the server

rails server

And head to http://localhost:3000/users/sign_up

If your page looks like this, your code is working:

I’m going to sign up; looks like it worked!

Next, we are going to get into rails console and take a look at the database:

Kill the server. Then In the terminal type.

```
rails c
```

Then:

```
User.count
```

This will tell us how many users we have on the web app. It should be “1”.

Then:

```
@user = User.first
```

And you should see the email you just entered in the terminal. I see:

Control + d will exit the rails console.

FYI, if you like to keep a clean workspace, you can always clear the terminal with:

```
clear
```

Now we are going to commit our changes:

```
git status
```

then

```
git add .
```

then

```
git commit -m "Added devise gem and User model"
```

Now we can sign in and out, but we need to update our view files so that we have some accessible links on the home page. We don’t want users to have to know to navigate to http://localhost:3000/sign_up do we?

Now, in our app/views/layouts/application.html.erb file, we are going to add a conditional statement to serve different links depending on whether the user is signed in or not:

```ruby
<% if user_signed_in? %>
    <ul>
     <li><%= link_to 'Submit link', new_link_path %></li>
     <li><%= link_to 'Account', edit_user_registration_path %></li>
     <li><%= link_to 'Sign out', destroy_user_session_path, :method => :delete %></li>
    </ul>
   <% else %>
    <ul>
     <li><%= link_to 'Sign up', new_user_registration_path%></li>
     <li><%= link_to 'Sign in', new_user_session_path %></li>
    </ul>
   <% end %>
```

The whole code block will look like this before:

```ruby
<!DOCTYPE html>
<html>
  <head>
    <title>Redditclone</title>
    <%= csrf_meta_tags %>
<%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track': 'reload' %>
    <%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
  </head>
<body>
   <% flash.each do |name, msg| %>
    <%= content_tag(:div, msg, class: "alert alert-#{name}") %>
   <% end %>
<%= yield %>
  </body>
</html>
```

And this, after:

```ruby
<!DOCTYPE html>
<html>
  <head>
    <title>Redditclone</title>
    <%= csrf_meta_tags %>
<%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track': 'reload' %>
    <%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
  </head>
<body>
   <% flash.each do |name, msg| %>
    <%= content_tag(:div, msg, class: "alert alert-#{name}") %>
   <% end %>
<% if user_signed_in? %>
    <ul>
     <li><%= link_to 'Submit link', new_link_path %></li>
     <li><%= link_to 'Account', edit_user_registration_path %></li>
     <li><%= link_to 'Sign out', destroy_user_session_path, :method => :delete %></li>
    </ul>
   <% else %>
    <ul>
     <li><%= link_to 'Sign up', new_user_registration_path%></li>
     <li><%= link_to 'Sign in', new_user_session_path %></li>
    </ul>
   <% end %>
<%= yield %>
  </body>
</html>
```

Don’t forget to save your file.

start the server

```
rails server

```

Test to ensure you can logout.

---

**NOTE:**
Devise is configured to use the http method `:delete` to sign out. But when using the code from above specifically

```ruby
<li><%= link_to 'Sign out', destroy_user_session_path, :method => :delete %></li>
```

This can work if we replace `link_to` with `button_to` in the application view.

Another option is to keep 'link_to' but instead we updated the devise config file
`config/initializers/devise.rb`. Search for `config.sign_out_via =` and replace ``:delete` with `:get`

## see issue https://github.com/heartcombo/devise/issues/4486

let lets commit our work so far

```
git add .
git commit -m "added conditional statement to change view based on if a user is signed in"
git push
```

Next we are going to create an associate between user and links to make sure that unregistered users can’t navigate to the url for submit link and submit a link. Because as it stands, a non-registered user could do that; they’d just need to know the url path.

Head to the user model at `app/models/user.rb` and add

```ruby
has_many :links
```

Before:

```ruby
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
```

After:

```ruby
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :links
end
```

And then we will add an association to the link.rb file:

```ruby
belongs_to :user
```

Before:

```ruby
class Link < ApplicationRecord
end
```

```ruby
class Link < ApplicationRecord
  belongs_to :user
end
```

Then we are going to get back into the rails console to inspect our work.

```
rails c
```

We are going to ask the rails console what the first link is:

```
@link = Link.first
```

Then let’s ask the console what user submitted this link:

```
@link.user
```

The console returns `=> nil`

Without this association that we just made between users and links, we would have been shown an error message for the query `“@link.user”`

Don’t mistake `“nil”` for an error. This isn’t technically an error, it just means that we haven’t added a user column to our database. Let’s do that now.

Exit the console with control + d.

We are going to run a migration to add users to the links database:

```
rails g migration add_user_id_to_links user_id:integer:index
```

then run:

```
rails db:migrate
```

Now we are going to get back into the rails console to confirm our work:

```
rails c
```

First we do:

```
Link.connection
```

And we get a bunch of gobbleygook, and then we do:

```
Link
```

And see:

`=> Link(id: integer, title: string, url: string, created_at: datetime, updated_at: datetime, user_id: integer)`

The id integer is there! Success.

Exit the console; control + d

Commit your work

```
git status
```

then

```
git add .
```

then

```
git commit -m "add association between link and user"
```

Next, we are going to update our link controller so that when a user submits a link, their user id gets assigned to that link.

We are going to update the new and create methods inside the `app/controller/links_controller.rb`

New method before:

```ruby
def new
  @link = Link.new
end
```

New method after:

```ruby
def new
  @link = current_user.links.build
end
```

**NOTE** explain what is happening here ie current_user. links and build

Create method before:

```ruby
def create
  @link = Link.new(link_params)
  respond_to do |format|
    if @link.save
      format.html { redirect_to @link, notice: 'Link was successfully created.' }
      format.json { render :show, status: :created, location: @link }
    else
      format.html { render :new }
      format.json { render json: @link.errors, status: :unprocessable_entity }
    end
  end
end
```

Create method after:

```ruby

def create
  @link = current_user.links.build(link_params)
  respond_to do |format|
    if @link.save
      format.html { redirect_to @link, notice: 'Link was successfully created.' }
      format.json { render :show, status: :created, location: @link }
    else
      format.html { render :new }
      format.json { render json: @link.errors, status: :unprocessable_entity }
    end
  end
end
```

Save the file!

Let’s confirm that this worked. Add a new link, and….

Huzzah! Let’s get back into the rails console to check our work.

```ruby
rails c
```

Then:

```ruby
@link = Link.last
```

Great! user_id: 1 submitted this last link. That was me (you). Now let’s check in on user_id: 1

```ruby
@link.user
```

Cool. Everything is working.

Authentication

Now we will add some authentication to our control to make sure users stay within their lanes.

First, we will add a before filter to our `links_controller.rb:`

```ruby
before_filter :authenticate_user!, except: [:index, :show]
```

We’ll add it right there at the top. Before:

```ruby
class LinksController < ApplicationController
  before_action :set_link, only: [:show, :edit, :update, :destroy]
```

After:

```ruby
class LinksController < ApplicationController
  before_action :set_link, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:index, :show]
```

---

**NOTE**
explain the chage in format from [:index] to %i [ index ]

---

To test this, let’s log out and check out the site and see if we can delete a link.

Hooray I was able to add a link and delete

Moving on. Links are still showing even if we aren’t signed in. Let’s change that.

Go to `app/views/links/index.html.erb`. We are going to wrap the ‘Edit’ path in an if block so that a user cannot see the edit path IF they are not signed in.

That block of code will look like this:

```ruby
<% if link.user == current_user %>
  <td><%= link_to 'Edit', edit_link_path(link) %></td>
  <td><%= link_to 'Destroy', link, method: :delete, data: { confirm: 'Are you sure?' } %></td>
<% end %>
```

Whole page before:

```ruby
<p id="notice"><%= notice %></p>
<h1>Links</h1>
<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Url</th>
      <th colspan="3"></th>
    </tr>
  </thead>
<tbody>
    <% @links.each do |link| %>
      <tr>
        <td><%= link.title %></td>
        <td><%= link.url %></td>
        <td><%= link_to 'Show', link %></td>
        <td><%= link_to 'Edit', edit_link_path(link) %></td>
        <td><%= link_to 'Destroy', link, method: :delete, data: { confirm: 'Are you sure?' } %></td>
      </tr>
    <% end %>
  </tbody>
</table>
<br>
<%= link_to 'New Link', new_link_path %>
```

Whole page after:

```ruby
<p id="notice"><%= notice %></p>
<h1>Links</h1>
<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Url</th>
      <th colspan="3"></th>
    </tr>
  </thead>
<tbody>
    <% @links.each do |link| %>
      <tr>
        <td><%= link.title %></td>
        <td><%= link.url %></td>
        <td><%= link_to 'Show', link %></td>
        <% if link.user == current_user %>
          <td><%= link_to 'Edit', edit_link_path(link) %></td>
          <td><%= link_to 'Destroy', link, method: :delete, data: { confirm: 'Are you sure?' } %></td>
        <% end %>
      </tr>
    <% end %>
  </tbody>
</table>
<br>
<%= link_to 'New Link', new_link_path %>
```

Alright! Let’s start out server and test out our change:

rails server
Got to: http://localhost:3000/ and sign out. Refresh the page.

## >>>>>

It looks like this worked for the third link, but not for the first two. This is
because we told our app to show the Edit and Destroy buttons only if the
link.user == current user. But, we created the first two links before we added a
user column to the database. So, the code we wrote won’t work for those first two
links.

Let’s sign in and create a new link just to test out our theory:
image

Yay. You can see that we cannot edit or destroy those first two links because we
did not create them (technically, no one did, according to the database). We DID
create the third link, however, and we are allowed to destroy it.

Let’s get into the console and confirm our theory.

```
rails c
```

then:

```
@link = Link.first
```

then:

```
@link = Link.second
```

See! You see the user_id for both of these links is set to “nil”.

We can update the database to show that the first user did indeed create these links.

First:

```
@link = Link.first
```

then

```
@link.user = User.first
```

then

```
@link.save
```

then

```
@link = Link.second
```

then

```
@link.user = User.first
```

then

```
@link.save
```

Ok, restart your server and refresh your page.

Huzzah!

Next, we will make sure you are signed in before you can submit a new link.
Right now, you can submit a new link even if you are signed out. See?

Under: `app/views/links/index.html.erb` just simply delete the following at the
bottom of the page:

```
<%= link_to 'New Link', new_link_path %>
```

Now it’s time for a git commit!

```
git status
git add .
git commit -m "authorization on links"
git checkout main
git merge feature/add_users
git push
```

Lovely. Now it’s time to add bootstrap and start styling a bit.

## Styling

When we created the new rails app with the flag `rails new app_name -c=bulma`
this added the bulma framework to the app via yarn and is in the `node_modules/bulma` folder

All the relevant css files are already configured, we just to style the views we want to see.

We are going to be editing the application view to add a navbar. But all that
styling add a lot of text to the application view which can cause it to become
visually cluttered.

So we are going to use what is called a partial view in
`app/views/layouts/application.html.erb` add the following:

```ruby
<%= render partial: "shared/navbar" %>

```

Before:

```ruby
  <body>
    <% flash.each do |name, msg| %>
```

After:

```ruby
  <body>
    <%= render partial: "shared/navbar" %>

    <% flash.each do |name, msg| %>
```

Next create the directory `/shared/` inside the `app/layouts` folder
Then create the file `_navbar.html.erb` pay attention to the underscore at the start
this denotes a partial view.

Inside the `\_navbar.html.erb` paste the following

We are using this format over conventional rails

`<li><%= link_to 'Sign up', new_user_registration_path %></li>`

because bulma is not styling the link like we want it to look like

`<a class="button is-primary" href="<%= new_link_path %>" >`
