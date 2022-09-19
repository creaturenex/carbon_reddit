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

Kill the server: ctrl + c. Then execute each git command individually in your terminal. Write it out rather than copy/paste; you’ll want to commit these commands to memory.

git status
git add .
git commit -m "generated link scaffold"
git checkout main
git merge feature/link_scaffold
git push
