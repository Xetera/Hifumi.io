# New Game!
## hifumi.io

### Helping out
Not a programmer? No problem, We would still love to get your input!

<a href="https://discord.gg/ZWW5CJw">
  <img width="250" src="https://i.imgur.com/GlEHVES.png"></img>
</a>

Most discussion will be in the `#tech-talk` channel.

### Tech

https://hifumi.io is made using parcel which compiles:

* Pug templates
* Scss

Netlify builds automatically from `master` so your changes are 
a single pull request away from going live!

### Contributing

1. `git clone https://github.com/Xetera/hifumi.io.git`
2. `npm install`
3. `npm start`
4. Go to the address it gave you, and work away!

#### Adding new tweets

Tweets are declared under `/content/tweets`. 

To add a new user, create a new `.md` file similar to the
existing ones.

Twitter users are declared under `/content/tweets/users`

To add a new tweet, add a new `.md` file in the same file.
The tweets are sorted by date in the format`YYYY-MM-DD`.

To reference a user, give the `name` property in the markdown
frontmatter the same name as the user inside the `/users` folder.

##### Made with <3 by the /r/NewGame community
