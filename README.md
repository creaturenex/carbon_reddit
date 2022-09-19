# README

This is a carbon copy of Child Mackenzie Reddit clone tutorial. This readme is to capture the differences in its creation since the original tutorial was created. This included starting with a PostgreSQL database and using Bulma as the CSS framework.

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
