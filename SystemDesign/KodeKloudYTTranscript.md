Introduction to System Design
0:00
This video is designed for absolute beginners who want to understand what system design is and how it actually
0:06
works. And instead of covering topics in isolation, we'll attempt to design one
0:11
real application together and improve the design step by step. Every concept,
0:17
load balancers, caching, indexing, replication, sharding shows up exactly
0:22
when our app needs it, so you always know why a component exists. You'll also
0:28
get free hands-on labs along the way where you can play with some of the components of the system. So if that
0:34
sounds useful, let's get started. When you look at the technology landscape, there are so many tools
0:40
available to you like databases, caching systems, CDNs, load balancers, servers, and many more. But ultimately, what you
0:47
want to do is solve a specific problem. For example, you might want to make an application that lets users share photos
0:53
with each other. To build this app, you have to use these components in the right way. System design is the skill of
1:00
choosing the right components and putting them in the right place to solve a software problem. And when you transition from junior to senior roles
1:06
in engineering, your responsibilities around that system change a lot. As a junior engineer, your job is to develop
1:12
a specific feature. You code something where you already know what the input will be and what the output should be.
1:19
As a mid-senior engineer, you're handed a problem and you have to figure out the approach yourself and how your solution
1:25
fits inside the existing system. And as a senior engineer, you have to design that system itself and make a lot of
1:31
choices on how the whole technology should work. The aim of this course is to help you get started with how
1:37
mid-seen and senior engineers think about systems. And the best way to learn how they think is to watch a system get
1:44
designed and watch it fail as well. So let's take an example and try to understand what problems we face when we
1:50
do system design and why system design is actually required. Let's say you want
1:55
to build an app, a site where people upload and share photos. You wrote the code and then you rented one server for
What Is a Server and Where Does Code Live
2:02
$10 a month. If you are wondering what a server is, then it is just a computer sitting in someone's data center whose
2:08
whole job is answering your visitors requests. So you take this server and put all the components in this server.
2:14
The web app, the database, the uploaded photos, all of it lives on this server. And honestly, this is a great setup.
2:21
It's easy to build, easy to take it live. And when something breaks, you know that I need to take a look at this
2:26
server only. Most of the apps should start exactly like this. Now, let's say
2:32
your app gets featured somewhere and 10,000 people show up in one business day. That one server may not be able to
2:38
handle this much traffic and even if it does not crash, the app can become painfully slow. But let's see some of
2:45
the specific ways it can fail. And every one of these failures has a name and a fix. That list of fixes is basically the
2:52
whole field of system design. Failure number one, the server runs out of CPU and RAM. Every visitor opening their
Failure #1: CPU and RAM Run Out (Load Balancer)
2:59
feed means your CPU is resizing images and running database queries at the same time. Pages that loaded in 200
3:05
milliseconds now take 10 seconds. The obvious fix is that you add a second server. So half the people go to one
3:12
machine and half go to the other. But that creates a brand new question. When someone opens your site, which of the
3:18
two servers should they talk to, first or second? You need a traffic officer
3:24
standing in front deciding where each request goes. That traffic officer is called a load balancer. As the name
3:30
says, it balances load on your servers. and it's the first box we'll add to our system. Failure number two, the database
Failure #2: Database Overloaded (Caching)
3:37
gets overloaded. Most of those 10,000 visitors are asking for the same things, the same trending photos, the same
3:44
popular profiles again and again. And your database runs the same query from
3:49
scratch every single time. The easy fix is to keep the popular answers sitting
3:54
in separate memory so that we don't have to query database again and again. This fast memory layer is called a cache. And
4:02
this is the second box we'll add to our system. Failure number three, the machine just dies. Probably a disc fails
Failure #3:The Machine Dies (Replication and Backups)
4:09
or a power supply gives out. Someone unplugs the wrong cable. And because everything lived on that one box, your
4:16
app is down and every photo anyone uploaded could be gone. There's a name for this problem. It is called a single
4:23
point of failure. The fix is to keep data on more than one machine. You can create a replica or copy of the database
4:30
which is running on a different machine and your actual photo files can move to external object storage like S3 which is
4:37
built to store large files safely and keep multiple copies automatically. Did you notice what we did in those
4:43
three steps? We never rewrote the app. We never made the code smarter. All we
4:48
did was split the work across machines and decide where each piece should live. That's really what system design is.
4:55
choosing where the pieces go and understanding what each choice costs you because every fix we added brings a new
5:02
problem of its own. For example, we added the load balancer and it can die too. We added cache. What if the cache
5:09
stores old instead of fresh data? We added database replica. What if the replica is not up to date with original
5:16
database? And that chain of fix something, get a new problem, fix that is exactly the chain this course talks
5:21
about. And you don't learn system design by memorizing diagrams. You learn it by watching different components fail. By
5:28
the end, when someone asks how you'd scale an app, you won't be reciting a diagram. You'll be describing things
5:34
based on logical thinking of how the system should work. In system design, we hear two terms again and again. HL and
HLD vs. LLD
5:43
LLD. These stand for highle design and low-level design. Let's use our photo
5:50
app to understand the difference between HLD and LLD.
5:56
Highle design is the zoomed out view. You're looking at the big pieces of the
6:01
system, the app servers, the database, the cache, the queue, the CDN, and how a
6:08
request moves between them. So when someone says design Instagram, they are
6:15
usually asking for highle design. They don't want to know the function names
6:20
you are going to use when you configure one of these components. They want to know the big blueprint of the design. It
6:28
includes things like where does a user request go? Where is the data stored in
6:33
your system? What happens when traffic grows? What will break first? And how do we fix
6:41
that component? Low-level design zooms into one small
6:47
feature like the like button. What happens when a user taps like? Which
6:53
function handles it? How do we check if the user already liked the photo? How do
6:59
we save the like in the database? How do we update the like count without
7:05
counting the same user twice? That's why interview questions are different too. Design Instagram is
7:13
usually highlevel design. Design the like feature on Instagram.
7:18
Or design an in-memory cache is usually low-level design because now the
7:25
interviewer wants to see how you organize code objects and data
7:30
structures. In this course, we are not writing the code inside one box. We will be looking
7:38
at highle design and how components talk to each other and what each choice costs
7:44
us. When an interviewer says design Instagram, you should always mention at
Interview Byte 1
7:50
which altitude you're going to answer the question. Say something like I'll
7:55
stay at the high level. I will mention components, data flow, and trade-offs.
8:00
And we can zoom in to any one component later if you want. one sentence and
8:06
you've shown you know the difference between highle and low-level design.
8:12
Most candidates just start going deep in answer. And if the question is low-level system
8:19
design like design and in-memory cache, you talk about the classes and data
8:25
structures you'd organize. No need to talk about servers.
8:30
The problem is answering at the wrong altitude. Don't start with load balancers when
8:37
they asked for a class design or function names. Interviewers say mismatched altitude is
8:44
one of the most common ways candidates lose the interview. An interviewer
8:50
rarely stops you. They just let you spend 20 minutes at the wrong height.
Functional vs Non-Functional
8:56
Before you design your app, you need to answer two very different questions about your app. The first question is
9:02
what should the app do and the second question is how well must the app do it.
9:08
The first one is called a functional requirement. The second is a nonfunctional requirement. And the
9:16
difference sounds academic until you see what each one actually means. So just
9:21
think about what functionality your photo app should have. First, a user should be able to sign up. Second, a
9:29
user should be able to upload a photo. Third, a user can follow another user.
9:36
Fourth, a user should be able to scroll a feed. Fifth, a user should be able to
9:42
like and comment. All these are functional requirements.
9:47
Each of these requirements is a feature you can actually see in the app and test. Either the photo upload works or
9:54
it doesn't. If the requirement is missing, the app is incomplete and everyone notices immediately.
10:01
Non-functional requirements describe the quality of the system. The feed loads,
10:07
but does it load in half a second or does it load in 8 seconds? The photo can
10:13
be uploaded, but will the photo survive if the disc fails? The app works for a
10:19
100 users, but does it still work for a million on a Saturday evening?
10:25
These aren't features. They are qualities like speed, durability, scale,
10:30
availability, cost. Nobody can point at non-functional requirements in a small
10:36
demo, but everybody feels the non-functional requirements. Just think about it. Two apps with the
10:43
exact same functional requirements can be completely different systems. A photo
10:48
app you build for your family and Instagram have nearly the same feature list. You can upload, follow, scroll the
10:55
feed, like the posts, etc. The functional lists match almost line for
11:01
line. What separates them is entirely nonfunctional requirements.
11:07
One system serves 10 people who will tolerate a slow day. The other serves a billion people who leave after 2 seconds
11:14
of lag. This tells you what exactly matters for the rest of this course. Every component
11:20
we're going to add to our design, the load balancer, the cache, the replicas, the que will exist to meet our
11:28
non-functional requirements. The user never asks for a cache in the system. Users always ask for a fast app.
11:36
And the cache is how you make the app fast. One warning before we start designing
11:42
systems. Non-functional requirements always fight with each other. Faster
11:47
systems usually cost more money. An app that never goes down needs extra
11:52
machines sitting idle. If the main machine fails, then the other machine can take the load. But those machines
11:59
sitting idle still cost you money. You can't just add whatever you want to your
12:04
system. You have to decide which components this app actually needs and which ones it can leave out. And how do
12:12
you decide that? You decide that by asking the right questions.
12:17
Let's see what questions you need to ask. You can't design the right system if you don't know what or who you're
5 Questions Before You Design Anything
12:24
designing it for. You need to take a pause and answer a few questions before you start designing the system. First
12:31
question, how many users and how fast are they growing? A photo app with a
12:37
thousand users and a photo app with 50 million users are not the same system.
12:43
For this course, we will assume that our photo app has 10,000 users today and
12:49
users are doubling every few months. So, we design for the millions we're heading
12:55
toward, not the 10,000 we have right now. Second question, is the app read heavy
13:02
or write heavy? For a photo sharing app, people scroll their feed way more than
13:08
they post. In the majority of cases, a user scrolls hundreds and thousands of
13:14
photos in a month, but they post two or maybe five photos in a month. Scrolling
13:21
photos is reading. Posting their own photo is writing.
13:26
Basically, we can say a user will read photos more than they will write.
13:32
Therefore, it makes sense that you spend your effort on the reading path or the feed page where they scroll photos.
13:40
Third question, what data can you absolutely never lose? And what can you
13:46
afford to lose? Can you afford to lose a user's uploaded photo? Never. If you lose someone's
13:54
photos, you've lost a customer for life. But the count of likes on a photo being
14:01
off by three for a few seconds, probably nobody's going to notice if you have 41
14:06
likes instead of 45. Knowing the difference tells you where to spend money on durability and where
14:14
to relax. Fourth question, how much latency can we
14:19
afford? Opening the feed needs to feel instant, say under 200 milliseconds.
14:27
Otherwise, users will feel the lag. But what about uploading a photo? People
14:33
will happily wait two or three seconds to upload the photo because uploading
14:39
feels like work. So you can do slow, heavy processing on the upload path, but
14:45
you want super fast loading of photos on the feed. Fifth question, what does it cost? Every
14:53
copy of your data, every extra server, every cash, you have to pay that bill
15:00
each month. The right design isn't the one with the most components. The right
15:06
design is the one that meets the first four answers for the least money.
15:12
Now, let's look at what those five questions gave us for the photo app. We
15:18
now understand that the app needs to be built for millions of users. The app is
15:24
heavily read. Photos must never be lost. Feed must feel instant. and keep the
15:32
bill sane. We haven't drawn any design yet, but we
15:37
already know that the feed is the hard part. Photos need the strongest
15:42
durability. By durability, I mean we need to store them carefully and uploads
15:49
can be slow and heavy. And honestly, this is the habit that
15:55
separates people who design systems from people who just collect components. Anyone can say add cash. The real skill
16:05
is being able to say why this app needs cash and how much the extra cash will
16:11
cost you. If I have to summarize, I will say before designing anything, always
16:19
ask these five questions. Always remember that the first five
Interview Byte 2
16:24
minutes of a design interview aren't about design at all. When the question lands that you need to design a photo
16:30
sharing app, the interviewer is watching whether you start drawing or you ask
16:36
some follow-up questions. Strong candidates ask the questions we already discussed.
16:42
How many users are we designing for? Read heavy or write heavy? What can we
16:48
never lose? How fast must it feel? Etc. Basically, you ask what this app must
16:56
do. What are the requirements before you build anything? Because the
17:02
interviewer's requirements might be different than what you're thinking. The answers you get from the interviewer are
17:09
your pillars. Every time you add a component later, you justify it with one
17:15
of the answers the interviewer gave earlier. For example, you will say, "I'm
17:20
adding a cache because we said reads dominate." That's the sentence
17:26
interviewers will remember and will leave a good impression. Your photo apps
Monolith vs. Microservices (When to Split)
17:31
requirements are clearly defined. Now, we have one important decision to make about the app. Should the app be
17:37
monolith or microservices? Let's define both using the photo app
17:42
because the definitions are simpler than people make them sound. In monolith architecture, the whole app
17:48
is one codebase and this codebase is deployed as one unit. So all the functionalities like signup, photo
17:55
upload, the feed load, likes and comments are bundled inside one program.
18:00
Think about it as a large code file where all functionalities can call each other. One thing you should remember is
18:06
that when you deploy a change to any of these parts in your codebase, for example, you change the signup page, you
18:12
will have to deploy the whole thing again. If I have to summarize, monolith means one codebase, one deployment, one
18:20
thing running on your servers. In microservices architecture, we split that one program into many small
18:27
separate programs. There will be one service for uploading photos, one for loading feed, there will be a
18:33
notification service, one service for likes, and each service will have its own codebase. And each service gets
18:39
deployed on its own and runs on its own servers. This can be done because each service is a separate program now. And
18:46
since they're separate programs, they talk to each other over the network. They have to make network calls to talk
18:52
to each other. Now, everyone thinks microservices are the real deal. And the monolith is something to be embarrassed
18:58
about. That's completely wrong. For our photo app today, when we have only a few
19:03
thousand users, the monolith is the correct choice. Think about what the monolith gives you. Everything is stored
19:09
in one codebase. All functionalities can directly talk to each other with function calls. No network in between,
19:16
nothing to fail. There's one thing to deploy, one thing to test, one place to
19:21
look when something breaks. A small team moves fast in a monolith because it is less complex. So why would anyone split
19:29
monolith to microservices? There are two reasons. The first is independent scaling. Remember our app is read heavy.
19:37
Users scroll more photos than they upload. Now imagine the feed scrolling needs 10 servers to cater to all users
19:44
while uploads need only two servers. In a monolith, you can't scale just the feed. You scale everything together. So
19:51
if you scale to 10 servers for feed, the upload functionality will also be scaled to 10 servers. But if you use
19:58
microservices and split the feed into its own service, then you scale only the feed service. In this case, you can also
20:05
scale upload services independently to two to three servers based on load. The second reason is team size. When 40
20:12
engineers all deploy one codebase, they queue up behind each other and step on each other's changes. Give each team its
20:19
own service and each team can work on its own schedule without asking permission. Microservices have downsides
20:25
too. Every service has to make a network call to talk to other services and a network call can be slow, can time out,
20:32
can fail halfway. We will talk about networking in later videos. Debugging changes too. In the monolith, you read
20:40
one log. With microservices, one user request might touch five services. You
20:45
have to take into consideration how services interact so that you can debug the system properly. And most companies
20:51
you'll actually join run a monolith plus a handful of services that got split off. Not one giant program, not 300 tiny
20:58
ones, a monolith with a few satellites. So for our photo app, we start as the
21:04
monolith and split a piece out only when that piece gives you a reason. Later in this course, we will split some services
21:10
from monolith and see why we do that. I've seen a fivep person startup run 30 microservices and they spent more time
21:16
debugging the network between the services than building their product. You should take decisions based on
21:21
requirements, not on buzzwords. Your photo app is starting to get more
Vertical vs. Horizontal Scaling
21:27
and more users. The one server you started with is maxing out. CPU is
21:32
running at 80% capacity and feeds are now loading slower than usual. Now you
21:38
need more power. And there are exactly two ways to get more power.
21:44
The first way is vertical scaling. You make your server bigger. You add more
21:49
CPU. You add more RAM and a faster disc. It's the easy choice. You don't change a
21:57
single line of code. You just pay for a more powerful machine. And for a while,
22:03
vertical scaling is genuinely the right move. If a bigger box buys you another
22:08
year, you should take it. But vertical scaling also has limitations.
22:14
Once you have purchased the biggest machine available to you in the market, you can't increase the size anymore.
22:22
Also, the price doesn't grow in a straight line either. Going from a small server to a medium
22:29
one is cheap. Going from the second biggest to the biggest can double your bill, but it may
22:36
add only 20% more power. You pay more and more for less and less
22:43
as you increase the size of the machine. And one big server is still one server.
22:50
If it goes down, your whole app goes down with it. Making the box bigger doesn't fix that.
22:58
So, the second way is horizontal scaling. Instead of one big server, you
23:04
run many small servers, each running a copy of your app. 10 cheap machines
23:11
instead of one giant one. Need more capacity? Add an 11th one.
23:18
This is how every large system on the planet actually scales because
23:23
horizontal scaling has two things vertical scaling never will. There's no
23:29
upper limit. You can always add another machine. And there's no single point of failure.
23:37
If one of the 10 machines dies, the other nine keep serving.
23:43
But the moment you have 10 servers running your app, you've got a brand new question.
23:50
When a user named Allen opens the app, which of these 10 servers handles the
23:56
request? A load balancer has to stand in front and spread the traffic across 10
24:02
machines. And another problem, those 10 servers
24:07
can't each keep their own copy of the data. Or a photo you upload to server 3
24:14
is invisible when your next request lands on server 7. The data has to live somewhere all 10
24:21
share. So the rule of thumb, scale up vertically first because it's simple.
Interview Byte 3
24:28
then scale horizontally when you hit the limit or when you can't afford a single
24:35
point of failure. I've seen teams jump to a fleet of servers for an app that 50 people touch
24:42
a day and all they bought was complexity and nothing else. There's a warm-up
24:49
question interview. Your app is slow. Why not just buy a bigger server? In
24:54
this case, the interviewer just wants to know, do you know what the trade-offs of
25:00
each approach are? The answer that works starts with vertical scaling. Explain
25:06
that we will go with a bigger server first because it's simple and buys you
25:11
time with zero code changes, but then explain vertical scaling has a hard
25:17
ceiling and one server can be a single point of failure.
25:22
So you go for horizontal scaling. Interviewers also care if your answers
25:27
come with specifics. You should mention that a 50 user internal tool should use
25:33
vertical scaling and a consumer app heading for a million users should go
25:38
for horizontal scaling. And in most cases you end up using both scaling
25:45
strategies. Let's pause the scaling story for one video and answer a question we've been skipping for some
How a request actually travels
25:50
time. A user opens their phone, types your app's address, photoapp.com,
25:57
and hits enter. What actually happens between that moment and the feed showing up on their
26:04
screen? Quick reminder from the start of the course. A server is just a computer in
26:09
someone's data center whose whole job is answering user requests. And like every
26:14
machine on the internet, your server has an address, an IP address.
26:20
Think of the IP address as the machine's phone number, a string of numbers that tells the network exactly where to
26:26
deliver things. But nobody types numbers. The user typed photoapp.com,
26:33
a name. So the very first thing the phone does is look up the IP address
26:38
behind the name. This lookup is DNS, the domain name system. And the easiest way
26:45
to think of DNS is as the internet's phone book. The phone asks DNS, "Where
26:52
is photoapp.com?" And DNS answers with the IP address of
26:57
your server. Now the phone knows exactly which machine to talk to. Once the phone
27:03
has the IP address, the phone and the server need a shared language so that they can talk to each other. That
27:10
language is HTTP. The phone sends a request and the
27:15
request is get me the home feed. and the server sends back a response to the
27:20
user, the feed data. But you'll almost never see plain HTTP anymore. You'll see
27:28
HTTPS, and the S stands for secure. The S is a
27:34
lock. Without it, everything between the phone and your server travels as plain
27:40
readable text, and anyone sitting on the path, like someone on the same coffee shop Wi-Fi, can read all the data,
27:48
including passwords. With the S, the whole conversation is scrambled, and the people in the middle
27:54
see nothing useful. How the lock gets set up is a story for another course. For now, the S means
28:02
nobody in the middle can read your user's traffic. Now, two terminologies about the speed
28:08
of the app because they get mixed up constantly. First is latency.
28:14
Latency is how long one round trip between the user and the server takes.
28:19
The request travels to the server. The answer travels back.
28:24
Second is bandwidth. Bandwidth is how much data you can push through at once.
28:30
The width of the pipe. And here's why the difference matters for the photo app. A feed showing 30 thumbnails isn't
28:38
slow because thumbnails are large in size. Thumbnails are actually small in
28:43
size. The feed is slow because of round trips. If each little thumbnail is
28:49
fetched one by one across half the planet, 30 round trips will make the feed slow, even on fast Wi-Fi. Hold on
28:57
to that thought. Two of the biggest boxes we'll add later. A cache that skips the trip to the database and a CDN
29:05
that answers from somewhere nearby both exist to fight exactly this. So here's
29:11
the whole journey now. The phone asks DNS for the IP address behind the
29:16
website name. Then the phone sends an HTTPS request to that address. Your
29:23
server does the work and sends back the response. But there's one thing wrong with the picture we just drew. The DNS
29:31
answer pointed at one server, and we just spent a whole video deciding you're
29:36
going to run 10 of them. So, which of the 10 should the phone talk to? That's
29:42
exactly the next video. Your photo app now runs on several servers, each one a
Load Balancer: Health Checks and Distribution
29:48
copy of the app. When a user opens the app, which of the 10 servers actually
29:54
answers to the user? The user should only talk to one of
29:59
these servers. The answer is a load balancer. And to
30:04
see where the load balancer fits in this design, let's trace exactly what happens
30:10
when someone opens your app. First, the user's phone does the DNS
30:16
lookup you already know. It asks, "Where is app.com?"
30:21
and gets back one address. But here's the trick. That IP address
30:28
doesn't point at any of your 10 servers. The IP address points at the load
30:34
balancer. So the user request lands at the load balancer first. And here is one major
30:42
misconception. The load balancer is not some special piece of hardware. The load balancer is
30:50
itself just a server running an application. And this application's entire job is to
30:57
take each incoming request and forward the request to one of the servers.
31:04
It may send one request to server 2, the next one to server 4, spreading the load
31:11
evenly. So if we have 10 servers and 100 requests, the load balancer should send
31:18
10 requests to each server so that the load is even.
31:24
Any server that sits in front like this taking requests on behalf of the servers
31:30
has a general name, a reverse proxy. A load balancer is the most common kind
31:38
of reverse proxy you'll ever meet. So if you hear reverse proxy, picture the load
31:44
balancer in your mind. Now what if one of the servers dies?
31:51
In this case, the load balancer should not send the requests to the dead server.
31:57
How does the load balancer know if a server is actually working or dead or
32:03
overloaded? This is the part that makes a load balancer more than a traffic splitter.
32:11
The load balancer actually does health checks for each server. Every few seconds, the load balancer quietly pings
32:17
each app server. You still alive? If server 3 stops answering, the load
32:23
balancer notices within seconds and just stops sending traffic to server 3. The
32:29
other nine pick up the work of the third server. Your users never see an error
32:34
because the load balancer never sent the request to the dead server. And that's the whole request path so
32:41
far. The user asks DNS for the address. DNS returns the load balancer's IP
32:48
address. The load balancer then picks a healthy app server. The app server does
32:54
the work, reads from the database, and the answer travels back the same way.
32:59
Every request to your app from now on walks that path.
33:05
Let's dive slightly deeper. So, how does the load balancer pick which server to send the request to? The
33:13
simplest way is roundroin. First request to server one, next to
33:18
server two, next to server three, and back to server one. Roundrobin is good
33:24
enough for a lot of apps. A smarter way is least connections.
33:30
Send the next request to the server which is handling the fewest requests right now.
33:36
For example, server one and server two got seven requests each, but server one
33:42
finished three requests quickly and has four requests pending, while server 2 is
33:47
taking some time to process requests due to some reason and still has seven requests.
33:53
So in this case, it makes sense to send requests to server one because server one has fewer requests pending.
34:01
The load balancer can do this because the load balancer keeps count internally. It remembers how many
34:07
connections it has sent to each server and how many are still open.
34:13
And you need to also remember that all servers are not the same size. Some servers can be larger and can handle
34:19
more requests. So the load balancer can also do weighted distribution. If two of
34:25
your servers are twice as big as the rest, you give those two a bigger share of the traffic.
34:32
So, do most companies build their own load balancers? The answer is no. We can use readily
34:39
available load balancers like Engine X or HA Proxy running on a machine you
34:45
manage. Cloud providers like AWS also offer their own load balancers like the
34:52
AWS elastic load balancer. These load balancers are proven,
34:57
reliable and they handle all the complex edge cases. But this architecture raises
35:04
an important question. What if the load balancer itself goes down? That would be
35:10
a real problem because all traffic will hit a dead end and all 10 app servers
35:16
behind the load balancer become unreachable. That's why in real production systems,
35:23
companies don't run just one load balancer. They run multiple load balancers. So if one fails, another
35:31
takes over. How multiple load balancers work together is a separate problem
35:37
which we will not address right now. The concept of stateless and stateful is very important in system design. Let's
Stateless vs. Stateful
35:45
understand both these terms with a problem in our system.
35:50
Your photo app is running on 10 servers behind a load balancer and traffic is
35:56
nicely distributed. But users started reporting that they are getting logged out from the app. You
36:03
didn't change any code. So what might be happening? When a user named Allen logs in, this
36:10
request may be handled by server one. The server creates a login session for
36:16
Alen. This login session is basically a small note. Allen typed the right
36:22
password and he is logged in. On every request after login, the server
36:28
checks this note instead of asking for the password again and again.
36:34
And server one did something that is totally natural. Server one saved that
36:40
session note in its own memory. A few minutes later, Allen opens another
36:46
page and the request gets routed by the load balancer to server 5 and server 5
36:52
checks its own memory. But we don't have Allen's login session in server 5 because it was stored in
37:00
server 1's memory. Due to that, server 5 says, "Who are you? Please log in."
37:08
This is exactly why users were getting logged out. This is the single biggest
37:14
thing that breaks when you go from one server to many. On one server, keeping
37:20
the login session in local memory worked perfectly because every request hit the
37:26
same machine. The moment a load balancer spreads users across servers, user data also spreads
37:34
across different servers. Different servers remember different users.
37:40
Because each server is maintaining login sessions, we say that these servers are
37:45
stateful. Stateful means the application keeps memory of previous requests. In this
37:53
case, the application is storing the login session details.
37:58
So the fix is to make your app servers stateless. A stateless server keeps nothing
38:04
important in its own memory. The server handles a request, sends the answer, and
38:10
forgets everything. But the login session has to live somewhere.
38:16
You don't want users to log in all the time. So you take that state out of the
38:22
individual servers and move it to one shared place. A fast shared store every
38:29
server can talk to. Now when the user logs in on server one, the login session
38:35
gets written to the shared store. If the next request from the same user hits
38:41
server 5, server 5 checks the same shared store finds the login session and
38:48
the user stays logged in. This solves the whole problem.
38:54
There is one more solution to this problem. You'll hear people say just use
38:59
sticky sessions. In sticky sessions, we tell the load balancer to always send a user back to
39:06
the same server. So if a user named Allen comes, always send to server one.
39:14
The thing is sticky sessions bring back the exact problem you are running away from. If a user is pinned to server one
39:22
and server one dies, that user loses their session anyway and the load
39:28
balancer can't spread traffic evenly anymore because the load balancer was configured to send the user named Allen
39:36
to server one. And login sessions aren't the only thing that makes the server
39:41
stateful. Just ask one question. If this server
39:46
vanished right now, would any user lose something? If the answer is yes, that data is
39:54
making the server stateful. Honestly, if data is making your server stateful, then that data has no business
40:02
living on the server. Move it to a shared store built for holding things
40:08
and let the server go back to being disposable. Let's make one thing absolutely clear.
40:15
Storing photos in a database or in cloud storage does not make your application
40:21
stateful. Those stored photos live outside the server.
40:26
Stateful means the server keeps information inside itself in its own
40:32
memory or on its own local disk. The question is never does my app store
40:38
data. Every real app stores data. The question is where that data lives. So let's see
40:46
some tasks that servers do and categorize them in stateless or stateful.
40:52
If users are uploading a photo, it is stateless. The request carries the
40:57
photo, the server writes the photo to the external storage and forgets it.
41:04
Downloading a photo, applying a filter, searching photos, fetching a photo's
41:10
details, all are stateless. Every one of these requests carries
41:16
everything the server needs to do the job. Login is the one call that
41:21
genuinely needs memory. The server has to remember the user is logged in
41:27
between requests. And now you know exactly where that memory should live in the shared store,
41:34
not on any one server. This is exactly why keep your app server
41:40
stateless is one of the first rules of scaling. The servers become disposable. You can
41:48
add one, kill one, restart one, and no user ever feels it. All the important
41:55
state lives in a separate store. interviewer's favorite way to test whether you actually understand
Interview Byte 4
42:01
horizontal scaling goes like this. You scaled to five servers from two servers
42:06
and now users are getting randomly logged out. What could have happened? We have already discussed that we need
42:13
to store login sessions in a separate store. Therefore, mention the cause first. Login sessions are stored in each
42:20
server's local memory. If user A's login session is stored in server A and his
42:25
request goes to server B, then server B won't recognize and log out. Then you
42:31
should provide the fix. We can move the sessions to a shared store and this shared store can be accessed by all the
42:37
servers. This approach keeps the app servers stateless. There is a move that can get you some
42:44
bonus points. You should mention sticky sessions before the interviewer does. Say, we could assign each user to one of
42:51
the servers, but it will not allow the load to spread evenly since users are now tied to a specific server. If you
42:58
mention the wrong answer yourself with the reason why it's wrong, it'll make a positive impact. Now, it's time to try
43:05
your first lab. First of all, you don't need to worry if you're not feeling confident for the
43:11
labs because labs come with a lot of hints and solutions.
43:16
All you have to do is go to the link, click the enroll button for this course,
43:22
go to the relevant lab, and click on the start button. In this lab, you'll run a small app in
43:29
two containers behind EngineX load balancer. You'll send a bunch of
43:34
requests to the containers, then shut one container down while it's still busy, so that you can see how the load
43:41
balancer will forward requests to the other container. The lab link is in the description. Go
43:48
give it a try. So far, we haven't discussed about database where we actually store our users data. We know
Data Modeling: Identifying Access Patterns
43:55
that we need to store things like photos, user information, likes, comments, etc. In this lesson, let's
44:01
dive deeper into what data our application actually stores and how you decide the shape of that data. This step
44:09
is called data modeling. Data modeling is deciding what information you need to store, breaking
44:15
information into organized pieces, and figuring out how those information pieces connect to each other. And data
44:21
modeling is one of the most important steps in system design because every database decision you make later depends
44:27
on it. Now, when people start designing, the first question most of them ask is
44:33
which database should I use, Postgress or MongoDB?
44:39
That shouldn't be the first question you ask yourself. The first question that you need to ask is what are people going
44:45
to ask this app to do. Basically, we should first understand the access patterns of our users. An access pattern
44:52
is simply a question your users will keep asking your app thousands of times a day. So, let's write down the access
44:59
patterns of our photo app. First question our users will ask is, "Show me
45:04
a user's profile." because our users will go through others profile. Second,
45:10
show me all photos uploaded by a user. Third, show me my home feed. Fourth,
45:18
upload a photo. Fifth, like a photo. Sixth, comment on a photo. Seventh,
45:25
follow another user. Look at this list carefully. This list is basically your
45:31
whole app written down as a set of questions. Once we have the questions, we can design the data that answers
45:37
them. Let's go one piece at a time. First, users. When a user named Allen
45:43
signs up, we create one user record, an ID, a name, an email. Second, photos.
45:50
When Alan uploads a photo, we create one photo record, a unique ID for this
45:56
photo, who posted the photo, the caption, and the upload time.
46:02
We also store where the actual image file is stored. But here's the important part. The actual image file itself does
46:11
not go into this record. The photo record only keeps a small link that
46:16
points to where the file is stored. Why we do store actual image separately
46:22
is a bigger topic and we will cover it properly in a later lesson.
46:27
Then come the connections between users and photos. Let's start with a like.
46:33
When Alan likes photo number 42, we don't copy Allen's name or the photo
46:38
anywhere. We create a small record with just three things. Allen's user ID, the photos ID,
46:48
and the time of the like. That's the complete record for one like.
46:54
This record says Allan liked this photo at this time. And if we want to know how
47:00
many likes photo 42 has, we simply count all the like records that carry photo
47:06
42's ID. A comment is similar to like, but stores
47:11
one more thing. When Allen comments great shot on photo 42, the comment
47:17
record stores Allen's user ID, the photos ID, the comment text, and the
47:24
time of comment. It is the same pattern. two IDs to connect the pieces plus the
47:31
actual content. And a follow doesn't involve a photo at all. A follow connects two users.
47:40
When Alen follows Priya, the follow record stores just two IDs.
47:45
Alan's ID as the follower and Priya's ID as the person being followed.
47:51
So when the app asks who does Allen follow, the app collects all the follow
47:56
records where the follower ID is Allen's ID. Notice the pattern here. Every
48:03
connection is just a pair of IDs plus a little extra information. This is
48:08
exactly why we gave every user and every photo an ID in the first place. The IDs
48:14
connect this whole data model together. And that's the whole data model for our photo app.
48:20
We have five items. Users, photos, likes, comments, and follows.
48:28
Let's make one thing absolutely clear. A data model is not a database choice. We
48:35
haven't picked Postgress or MongoDB. A data model just says what we store and
48:41
how the pieces connect to each other. These five pieces can live in an SQL
48:46
database or a NoSQL database. That decision comes at a later stage.
48:52
So why did we insist on writing the questions first? Let's take one access pattern and walk
48:58
through it. Show me my home feed. Say Alan follows 200 people. To build
49:05
Allen's feed, the app has to first find all 200 people Alan follows. Then find
49:11
the recent photos from each of those 200 people and then sort all of those photos by time to show the newest ones first.
49:19
That one question touches the follows data, touches the photos data and needs
49:25
sorting as well. And the thing is scrolling the feed is the single most
49:30
common thing users do in this app. You only discover this when you start from
49:35
the access patterns. If you had started by picking a database, you would have discovered it
49:41
much later. The access patterns also tell you how to organize the data.
49:47
Show me all photos uploaded by Alen tells you that photos must be easy to look up by the user who posted them.
49:54
Show me my home feed tells you that photos must be easy to sort by time.
50:00
Each question directly points at how the data should be arranged. So remember the order. questions first, data shape
50:08
second, technology last. Our photo app stores five things: users, photos,
50:14
likes, comments, and follows. And we selected these five things based on the
50:20
handful of questions users actually ask. And now that we know exactly what we
50:26
store and what users ask, we can finally answer the question everyone argues
50:32
about. Should this data live in an SQL database or a NoSQL database?
50:40
That's exactly what we'll figure out in the next lesson. You've identified the most important pieces of data that you
SQL vs. NoSQL
50:46
need to work with. Now, the next question we need to ask ourselves is should we go for SQL or
50:53
NoSQL database to store this data? It boils down to one question. Is our data
51:00
structured or unstructured? If the data is structured, we use SQL database and
51:07
if it is unstructured, we use NoSQL database. Let's dive deeper into this.
51:14
SQL databases provide good structure. Your data lives in table format with a
51:19
fixed shape just like a spreadsheet where you have rows and columns. If we
51:25
look at photos that we upload in our app, then we know each photo has exactly the same fields every time.
51:32
So all the photos will have an ID, who posted the photo, the caption, the
51:39
upload time and the image link. So we can have one table named photo details.
51:47
Second functionality that SQL provides is relationships.
51:52
A SQL database is built to connect or join tables together. If my query is
51:58
find everyone Alan follows, then find their photos, then I can join two
52:03
tables. The follows table gives me everyone Alan follows and the photos
52:09
table gives me the photos posted by those people. By connecting tables, I
52:15
can easily answer a lot of similar questions. An SQL also gives you transactions.
52:22
What do we mean by transaction? Let's say Alan deletes one of his photos. Then we need to delete the photo
52:29
record. But then we also need to delete all the like records and comment records
52:34
associated with this photo. So we group the deletion of photo, its likes and
52:40
comments as one unit and call it one transaction. So either all of the deletion will
52:47
happen successfully or none of them will happen. This makes sure that data is never left
52:53
half finished. You will never want to store likes and comments of a photo
52:59
which has been deleted. That's why we group them in one transaction. This transaction property falls under acid
53:04
guarantee that SQL provides. You'll hear the word ACID in every database conversation. But let's not worry about
53:11
acid properties for now. Some of the examples of SQL databases are MySQL and Postgress.
53:19
Now, no SQL databases are almost opposite in nature. They don't store data in fixed tables. NoSQL actually
53:27
loosens the structure and each record can have a different shape. For example,
53:32
if we want to store user behavior on how they interact with the app where the users actually click on the app, then
53:39
every user behavior will be different. And this is where NoSQL can be a great database.
53:45
NoSQL is built to spread across hundreds of machines and answer give me user
53:50
behavior of Allen very fast at enormous volume. Some of the examples of NoSQL databases
53:56
are MongoDB, Dynamob and Elastic Search. If we look at our data carefully, our
54:03
data is structured. For example, all photos need similar fields to get stored. ID, posted by, caption, upload
54:12
time, image link, and our data is full of relationships as well. Users, photos,
54:19
likes, follows all need to be connected with each other to get relevant information out. This information is
54:26
pointing straight at SQL. So for the core of the photo app, we will pick SQL
54:31
databases. And within the SQL family, we will use Postgress.
54:37
Yes, we have chosen SQL for our app, but real systems use both. For example, if
54:43
our app wants to store user preferences to the app, Allen's theme, notification settings, language, etc., then all user
54:51
preferences will have different shapes and user preference will change often. So, storing user preferences in NoSQL
54:58
database works perfectly. So, in real life, we will have two databases for our app. SQL for storing structured data
55:05
like photos, users and NoSQL for unstructured data like user preferences
55:11
and user behavior. Our servers will connect with both and the application code will know which database to ask
55:18
based on the data it needs. If we are building the photo feed for a user, then we query Postgress or SQL database. If
55:26
we are loading users preferences, we will query MongoDB or NoSQL database.
55:32
It's just an if condition in your code, nothing magical. If you're not sure which database to choose, start with
55:38
SQL. SQL will take you further than most people expect. Also, let's make one
55:44
thing absolutely clear. A database is not some special piece of hardware.
55:49
Postgress, MongoDB, or any other database is just a program running on a
55:54
regular server with a CPU, RAM, and a disk. You can run Postgress or MongoDB
56:00
on your laptop right now. There's one question that comes up in almost every design interview. The interviewer asks
Interview Byte 5
56:07
you to choose between SQL or NoSQL for your design, and you need to explain why
56:13
you chose one over another. Why is the most important piece? What
56:19
earns points is deriving the choice from your access patterns. You should say,
56:24
"My data is relational in nature. users, photos, follows are connected with each
56:30
other. To display the home feed, I need to connect these data points together,
56:35
which means I will do joins. Therefore, it makes sense to use SQL. If I later
56:41
add a high volume piece with no relationships like analytics events, that piece can go to no SQL.
56:48
In these couple of sentences, you've covered structure of data, joins, guarantees, and the fact that real
56:55
systems use both. You shouldn't say things like, "I will choose no SQL because it scales." The interviewer will
57:02
ask, "What exactly stops SQL from handling your workload?" And remember the word acid before you walk in the
57:09
interview. ACID makes sure either we write full transaction or write nothing
57:14
at all. We just decided that SQL database is a good choice for our photo app. But now we are facing another
Database Indexes
57:21
challenge. When our user base was 10,000 users, everything was fine. But as we
57:27
are stepping into the million user zone, we have started to notice that some of our queries are getting slow. Home feed
57:34
that used to load in 200 milliseconds is now loading in 500 milliseconds. And
57:40
this is a real problem you will face in every system you design. When the user base grows, some of your queries will
57:46
get slow. Let's take an example. If I have to check all the photos uploaded by
57:51
the user Alen, then the database will go to the photo details table and check every photo one by one. Was this photo
57:59
uploaded by Alan? No. Was this one uploaded by Alan? No.
58:05
So the database has to go through all the photos to identify the photos that were uploaded by Alen. This is
58:11
definitely not the most efficient way. As the user base grows, the number of rows in our database increases
58:17
exponentially. And we can't always go and query all the rows. That's why we
58:22
use something called indexing. And indexing helps us to make the queries faster. Let's see how. If you've seen
58:29
the index at the back of a book, you can see all the keywords. And you also see where all this keyword is appearing. For
58:35
example, mitochondria word is on page one, page 100 and page 125. We do
58:42
exactly the same thing in indexing. We create an index on a column. So in our
58:47
photo details table, we will create an index on the posted by column. After creating the index, we will know that
58:54
Allen's photos are on row number 822, then row 15,000, and then row 100,000.
59:00
And now the database will use this index every time so that the database can quickly jump to the rows where Allen is
59:06
appearing. This is how we fasttrack the query. If creating index makes queries so fast,
59:14
shouldn't we make indexes for all the columns? No, we can't do that because creating
59:20
and maintaining an index is also a big task. Let's take an example. Whenever a
59:26
new user signs up on the platform, we have to include this new user in the index as well. So we will have to write
59:33
the index again because now we have new data and the index has to know where to find the new user. Every new write to
59:41
the table also means extra work to keep the index updated. If we have lots of indexes, we have to
59:48
do lots of work to keep indexes updated whenever new data is added to the table.
59:53
Also, let's see how this whole thing works in real life. Whenever a query
59:59
runs, the query hits the index first. Then the index points to the exact rows
1:00:05
and then the query directly picks up those rows. The database never touches the rest of the table. This index lies
1:00:13
within your database only. For our photo app, which columns should we index? We should index the posted by
1:00:21
column so that we can look up any user's photos quickly. Then we should also
1:00:26
index the upload time so that we can quickly look up or sort the photos by date. And I want to leave one thing in
1:00:33
your mind. Do not guess which column to index. I repeat, do not guess which
1:00:40
column to index. First you should identify your slow queries. Which of the
1:00:45
queries are actually getting slow? And then to make those queries faster, you should index the relevant columns. There
1:00:52
is no hard rule on how many indexes you have to create. But in general, you will
1:00:58
see most of the tables have three to five indexes. So start with zero indexes, see which queries are slow, and
1:01:03
then add the indexes. It's time for one more lab. In this lab, you'll fill a
Free lab 2 - Database Indexes
1:01:09
database with 5 million rows. Then you'll run a query and watch it take some time to run. It will be really
1:01:15
slow. You'll find out why it's slow and then add one index and you'll run it again. Now the same query will take a
1:01:22
few milliseconds. The lab link is in the description. Go try it yourself.
1:01:28
Let's zoom out and revisit our design till now. When a user opens our photo app, the request first reaches the load
1:01:35
balancer and the load balancer forwards the request to one of our 10 servers.
1:01:40
All these servers are stateless and the login sessions of all the users live separately in a shared store so that any
1:01:47
server can handle any user. Behind the servers we now have two databases.
1:01:53
Postgress stores our structured data users photos likes comments and follows.
1:01:59
And inside Postgress database we have created indexes on the posted by column and the upload time column so that our
1:02:05
most common queries stay fast and users get quick response. And we also have our
1:02:10
MongoDB database that stores our unstructured data like user preferences and user behavior. This is the complete
1:02:18
design till now and we will keep adding components to this design as our app grows. In the last video, we learned how
Caching
1:02:25
to speed up the queries by using an index. In this video, let's consider a scenario where we are fetching the same
1:02:31
item again and again from the database. Let's say you have a public figure on
1:02:36
your app like Leonel Messi or Cristiano Ronaldo and millions of people follow
1:02:42
them. So whenever they post a photo suddenly millions of people want to see their photos. So what will happen is
1:02:49
these millions of people will ask for the same photo from the database. So what the database is doing is answering
1:02:56
millions of queries which are identical. Millions of queries are asking for the same photo that Lionel Messi uploaded.
1:03:04
So, it doesn't make sense to fetch the same photo from the database so many times. To fix this problem, we add a
1:03:10
cache to our design. And a cache is just a small blazing fast store of popular
1:03:16
items and it can respond to queries very quickly. We keep this cache in front of
1:03:21
the database so that popular queries can be answered quickly without hitting the database.
1:03:27
To give you a reference, if a user reads data from the cache, the cache can respond in under 1 millisecond, where
1:03:34
the same read from the database might be 20 or 30 milliseconds. Let's see an example of how the cache
1:03:41
will work. In this example, we will use a cache named Reddus. A request comes in
1:03:47
for the trending photo. First, the app checks Reddus. Do you already have this?
1:03:53
If Reddus has it, we call it a cache hit. The app takes the photo record from Reddus and replies to the user and the
1:04:00
database never even knows about the request. If Reddus doesn't have it, then we call it a cache miss. Since the cache
1:04:08
doesn't have the photo record, the app goes to the database and because that record was not in the cache, the app
1:04:14
writes that result into the cache, then returns it to the user. Next time any other user asks for this photo, it comes
1:04:22
straight from the cache. So the first person who asks for the photo goes through the full database cycle. So what
1:04:30
would the photo app actually put in the cache? We will put the photo record everyone is asking for right now like
1:04:36
that new post from Lionel Messi and the metadata of whatever else is trending on the app. Popular profile cards are
1:04:44
another good option to cache. By profile card we mean popular profiles username,
1:04:50
display picture, bio, etc. Millions of people open Messi's profile
1:04:56
every day and the profile itself barely changes. Therefore, we can keep profile
1:05:01
in cache. Did you notice the properties of items that we are keeping in cache?
1:05:06
These are information that are small read constantly changing rarely. That's
1:05:12
what makes a good cache entry. And I wanted to discuss one point that closes a loop from an earlier lecture. Remember
1:05:19
we said that the login sessions of all users have to live in a shared store that every app server can access. That
1:05:26
shared store is very often this same Reddus. Login sessions are tiny read on
1:05:31
every single request and need to be fast which is exactly what a cache is good at. So Reddus ends up doing two tasks
1:05:39
for us. Caching hot data and holding login sessions. But handling a cache is
1:05:45
not the easiest task. Adding a cache means you now have the same piece of data sitting in two different places in
1:05:53
Reddus and in the database. And the moment you have two copies of something,
1:05:58
you have to ask the hard question. What happens when one of them changes and the other doesn't? For example, if there is
1:06:06
a photo record in the cache, but the user has already deleted the photo in the database. In that case, the photo
1:06:13
can still be accessed by users from the cache. But in reality, the uploader deleted the photo from the database.
1:06:20
Therefore, our system can become inconsistent and we have to be very careful. That's the trade you take on
1:06:27
with caching. You get enormous speed, but now you have to make sure the data in the cache is in sync with the
1:06:33
database. Your photo app now has a cache in front of the database. The cache now
1:06:39
gives faster replies to queries and reduces the load on the database. But you've created another problem. The
1:06:46
moment you added a cache to your system, the database has your data and the cache has a copy of your data. And sooner or
1:06:53
later, those two copies can become inconsistent with each other. If Leonel
1:06:58
Messi edits his bio, the right goes to the database and bio will be updated.
1:07:03
But the cache is still storing the old bio and continuously sharing it out to everyone who visits the profile.
1:07:10
The database is having the right data but the cache is having old data and your users are seeing old data. So how
1:07:18
do you keep the cache consistent with the database? There are two tools to handle that. The first is a TTL.
1:07:26
TTL stands for time to live. When we write something into the cache, we write
1:07:32
it with an expiry time. We say this is good for 60 seconds. And after 60
1:07:37
seconds, Reddus throws it out automatically and the next request misses the cache, goes to the database
1:07:44
and pulls a fresh copy of the data and the cache is updated with new data again. TTL is the lazy fix and that's
1:07:52
not an insult. We call it lazy because it waits for data to expire and then fetches the new data. So in our example,
1:08:00
users might see the old value up to 60 seconds because data expires only after
1:08:05
60 seconds. For data like follower count, nobody will care. For something that has to be
1:08:11
correct the instant it changes in the database, 60 seconds is a long time.
1:08:17
TTL can create one more problem. When a really popular entry expires in cache
1:08:22
and multiple people are trying to access it, then all the users will have cash misses at the same moment. For example,
1:08:30
if the trending photos 60 seconds run out and it gets deleted from cache, then suddenly a thousand requests will miss
1:08:36
the cache and slam the database with the identical query at once. This pileup of
1:08:42
queries to the database has a name, a cash stampede. One simple defense is to not give every
1:08:50
cache entry the same expiry. If there are two photos in cash, one from Messi,
1:08:55
one from Ronaldo, we make sure both of them don't expire at the same time. We
1:09:00
stagger their TTLs a little so the hot entries don't die together. By
1:09:06
staggering TTL, we mean we will make one photo expire after 61 seconds instead of
1:09:11
60 so that they don't expire together. The second tool to keep cache and
1:09:16
database in sync is active invalidation of data. When the data changes in the
1:09:22
database, you reach into the cache and deal with the old copy. If the user
1:09:27
edits their bio, the app writes the new bio to the database and at the same time
1:09:32
deletes the old bio from the cache. Now, the next request misses the cache because we deleted the data and goes to
1:09:39
the database. And in this cycle, cache will have the new entry. We don't wait
1:09:45
for the cache to expire. The moment the data changes, we delete the old copy from cache. This sounds like a better
1:09:52
approach. But here we are doing more work as well because every time we write new data, we also have to remember to
1:09:59
invalidate the cache. So which approach to choose TTL or cache invalidation?
1:10:06
There is no correct answer to be honest. You need to check how much you can tolerate the old data which is a
1:10:12
question you already answered when you thought about requirements of your app. The trending feed can be a few seconds
1:10:18
old. So in case of photo feed, give it a short TTL and move on. What about a
1:10:24
user's privacy setting? Whether their photos are public or private. We can't have old data even for a second because
1:10:31
old there means showing private photos to the wrong people. In privacy settings, we choose cache invalidation.
1:10:38
We do have some industry benchmarks for this. A home feed can have a 30-second TTL. A profile card can have a few
1:10:46
minutes TTL because profile is changed rarely. A trending list can have a 60-second TTL. And anything security
1:10:54
shaped, privacy settings, permissions, gets no TTL at all, only active
1:10:59
invalidation. You'll tune all of these later, but these defaults are acceptable in the
1:11:04
industry. And one thing should be clear in your mind. The worst bugs aren't when the cache is empty. The worst bugs are
1:11:12
when the cache is confidently showing wrong data. There's an old joke that there are only two hard things in
1:11:18
computer science and one of them is cache invalidation. Caching gets you two follow-up questions
Interview Byte 6
1:11:23
in almost every interview. Let's see the first question. It says the cash is
1:11:29
full. What will you delete from cache? The common answer is LRU. It stands
1:11:36
least recently used. Basically, we release items nobody has accessed for
1:11:42
the longest. The second question is, if a hot entry
1:11:47
expires and 10,000 requests miss the cash the same moment, what happens?
1:11:54
This is the cash stampede from the lecture. So, mention this jargon in the
1:11:59
interview. Then give one defense. allow one request to rebuild the entry while
1:12:05
the others wait or briefly receive the old value. You can also refresh hot
1:12:12
entries before they expire. Adding randomness to TTLs helps prevent
1:12:18
many different entries from expiring simultaneously and expect. How do you keep the cache
1:12:25
and the database in sync? We already have that answer. You need to use TTLs
1:12:31
where old data is tolerable and use active invalidation where you can't
1:12:37
afford showing old data. Note that candidates who bring up the stampede before the interviewer asks
1:12:45
send a strong hire signal because it shows you've thought about the failure,
1:12:51
not just the feature. It's time for the next lab. In this lab, you'll put a reddis cache in front of your database
Free Lab 3 - Caching with Redis
1:12:57
to make it faster. You'll check the speed before and after. Then you'll change the data in the database and
Replication
1:13:03
watch your app show the old data by mistake. The lab link is in the description. Go give it a shot. We just
1:13:10
added cache in front of our database and we understood cache keeps only the hot or famous data. Most of the data is not
1:13:18
on cache and many queries still hit your database continuously. And we already established that photosharing app is
1:13:25
read heavy app. Users read hundred of photos. Therefore, database still do lot
1:13:30
of work to answer user queries. If we notice, we have only added one database
1:13:35
in our design. If this database goes down, we will lose all our data. This
1:13:40
can be a single point of failure. To avoid single point of failure, we add replicas of this database. It is an
1:13:48
industry standard to keep two replicas of the database. So in total we have three copies, one primary database and
1:13:55
two replicas. Of course our cost goes up because now we have three databases instead of one. But guess what? If we
1:14:03
have three exact copies of database, should we keep answering user queries from only one primary database? No. If
1:14:10
we are paying for three databases, let's use all three copies of database. So now
1:14:15
we can distribute the read queries to these three databases so that the load on the primary database will reduce
1:14:21
significantly. It raises one more question. How do we know which of these three databases
1:14:27
should answer user query? We again add a load balancer before these databases which will balance the read load on all
1:14:33
three databases. Okay. Now I am going to ask one very important question. We
1:14:39
distributed the read data to all three copies of database. But what about the right queries? In which database we will
1:14:46
write the new information? Primary database is the only one that will take the rights. We simply can't write
1:14:52
information in different database. For example, let's say primary database and first replica both have the same record
1:14:59
that value of X is equal to 7. And then suddenly we have update that new value
1:15:04
of X is equal to 9. And we updated our primary database with new value 9. But
1:15:09
at the same time we get one more write that says now X is equal to 13 and this
1:15:15
time we write value of X in the replica database. So in replica we have X equal
1:15:20
to 13 but in primary database have X equal to 9. And now we are confused
1:15:25
which value is actually the correct value of X. So if we write at multiple places we really don't know which one is
1:15:32
true. That's why we avoid writing at multiple places. We only write at one place which is a primary database. I
1:15:39
want to repeat this again. We can distribute the reads to all three database copies but we only write to
1:15:45
primary database. One thing which we have understood in the past is that whenever we maintain copies of same
1:15:50
data, it's very very difficult to keep all the copies in sync. I am writing all the data to primary database and other
1:15:58
two database copies have to make sure that they are in sync with primary database. So what happens is that both
1:16:03
the replicas have open connection with primary database and they stream the data from primary database. This makes
1:16:09
sure that the replica is up to date with the primary database. Since we are copying the data from primary database
1:16:15
to replicas, we know that replicas will always be slightly behind to the primary database and we call this replication
1:16:21
lag. Usually it takes few milliseconds to get the latest data from primary database to the replica. What we say is
1:16:28
primary database and replicas are not consistent at the moment but they will get consistent eventually and this
1:16:34
phenomenon in technical world is called eventual consistency. The replica doesn't have the newest write yet but it
1:16:40
will eventually. Now let me show you the bug this replication lag creates in real life.
1:16:46
Alan uploads a new photo and this right goes to the primary database. Half a second later refreshes his profile page
1:16:53
to see his own photo. Refreshing the profile is a read query and we know the read queries are distributed to all
1:16:59
three databases. Let's say this read goes to replica 2 and replica 2 has not received the new photo from the primary
1:17:05
database yet. So Alan just posted a photo and his own profile is showing there is no photo for a very short
1:17:11
while. But notice the data was never lost. The photo was safely sitting in
1:17:16
the primary database the whole time. The replica was just slightly behind the primary database. So how do we fix this
1:17:23
bug? The fix is simple. When a user is reading their own recent data, we send that read query to the primary database
1:17:29
because we know we surely find the recent data in primary database. So Alen's own profile reads from the
1:17:35
primary database and Alen will always see his own photo immediately. But when other users open Allen's profile, their
1:17:41
read queries can go to the replicas because if some other user sees Alen's new photo half a second late, it hurts
1:17:47
no one. And this gives us the opposite term, strong consistency. Strong
1:17:52
consistency means every read is guaranteed to return the latest data. And the simplest way to get strong consistency is to read from the primary
1:17:59
database because the primary database always has the latest data. But remember, every read we send to the
1:18:06
primary database adds load back on the primary database, the exact load we were trying to reduce. So we don't make
1:18:12
everything strongly consistent. Most of a photo sharing app is perfectly fine with eventual consistency. Deciding
1:18:18
which part of the app needs which consistency is a real skill in system design. Now let's come back to the
1:18:23
reason we added replicas in the first place. To avoid the single point of failure. What happens if the primary
1:18:29
database actually dies? Our app does not go down. We will promote one of the replicas to become the new primary
1:18:35
database. This promotion of replica to primary database is called failover. To
1:18:40
summarize, replication gives us two benefits. Replicas takes the reload and reduce burden on primary database and
1:18:47
replicas save the app when the primary database dies. There's one more thing that I want to be aware of and this is
1:18:52
the single most dangerous misunderstanding students have with replicas. Let's say someone on your team runs a wrong delete query on the primary
1:18:59
database and wipes 1 million photo records. Basically, they deleted the complete primary database. What will the
1:19:06
replicas do? The replicas blindly copy everything from the primary database, including your mistakes. Within
1:19:12
milliseconds, that delete query reaches both the replicas. And now all three copies are perfectly empty. Replications
1:19:19
do not save your data if you make a mistake and delete the data. That's why we also need real backups. A backup is a
1:19:25
snapshot of the database and we keep this snapshot away from the system. So if someone wipes the data on Tuesday,
1:19:31
you can restore Monday night's backup. In the last lesson, we added two replicas of our database and our read
Sharding
1:19:37
problem was solved. Reads are now distributed across three copies of the database. If our primary database holds
1:19:43
1 tab, then replica 1 also holds the same 1 TB and replica 2 also holds the
1:19:49
same 1 TB. Now, let me ask you a question. Let's say we reach 50 million
1:19:54
users and they have uploaded billions of photos, comments, and likes. What happens when all this data becomes too
1:20:00
big to fit on one database machine? Eventually, we will accumulate so much data that it won't be fitting on one
1:20:06
primary database machine. Can replicas save us here? No, they won't save us
1:20:11
because every replica has to hold exactly the same data as primary database 2. Therefore, at some point, we
1:20:17
have to divide our database into multiple parts. This technique is called sharding. Instead of one database
1:20:23
holding everything, we split the data across many databases and each database holds only a slice of the data. Each
1:20:29
slice is called a shard. Basically, one shard means one database machine. For example, we take our 50 million users
1:20:36
and spread them across four shards. Some users live on shard zero, some on shard one, some on shard 2, some on shard 3.
1:20:45
No single database holds everything, but together they hold everything. And the best part is when we run out of space,
1:20:51
we simply add one more shard or machine. But splitting the data raises an obvious
1:20:56
question. If Allan opens his profile, on which shard is Allen's data. We can't go
1:21:02
searching all four shards one by one. That would defeat the whole purpose of splitting. We need a rule that tells us
1:21:07
on which shard we can find the data. We first pick one field of the data on basis of which we will split the data
1:21:13
across four shards. And this field is called the shard key. For our photo app, the natural shard key is the user ID.
1:21:20
Because everyone will have unique user ID, it makes sense to distribute the data based on user ID. But how do we
1:21:26
divide the data in four parts? The simplest rule we can use is division. Divide the user ID by the number of
1:21:32
shards and the remainder is your shard number. Let's do this with real numbers. Alen's user ID is 10. 10 / 4 leaves
1:21:40
remainder 2. So Alan lives on shard 2. Another user has ID 13. 13 / 4 leaves
1:21:47
remainder 1. So that user lives on shard one. This rule is fast and every server
1:21:52
can compute it instantly. But two things can go wrong with sharding and you should know both. The first problem is
1:21:58
called a hot shard. Let's say by bad luck Messi and Ronaldo and all the other celebrity accounts land on shard 2.
1:22:05
Millions of users open these celebrity profiles every minute. So shard 2 will have a lot of load as compared to other
1:22:11
shards. The fix is to pick some other shard key that spreads users evenly across all the shards. For example,
1:22:17
instead of putting all the celebrities together on one shard, a good shard key will scatter Messi on shard one, Ronaldo
1:22:23
on shard three, and so on so that no single shard becomes overburdened. The second problem is worse. Remember our
1:22:30
simple division rule. Divide by the number of shards. We were dividing the user ID with number four because we had
1:22:36
four shards. Now let's say the app grows more and we add a fifth shard. Because we have five shards now, our rule
1:22:42
changes from divide by four to divide by 5. Watch what happens to Alen. Earlier 10 / 4 gave remainder 2. So Alen's data
1:22:50
lives on shard 2. But now 10 / 5 gives remainder zero. So the rule says Allen
1:22:56
should be on shard zero. But Allen's data is still physically sitting on shard 2. And it's not just Allen. The
1:23:03
remainder changes for almost every user ID because we are now dividing the user ID with five instead of four. Which
1:23:09
means almost all of our data has to physically move to a different shard. Imagine moving billions of photos
1:23:14
between different databases just because we added one more machine. That's a nightmare. The industry fix for this
1:23:20
nightmare is called consistent hashing. What consistent hashing makes sure is that we move least amount of data
1:23:26
between different shards when we add more shards. The trick is that in consistent hashing, the rule doesn't
1:23:31
depend on the total number of shards. Each shard owns a small range of user IDs. And when we add a fifth shard, the
1:23:37
new shard takes over only a small range from only one neighbor. So only those few users move. and all other shards
1:23:43
remains unaffected. So remember, sharding is the tool you use when your database can't fit on one machine. But
1:23:49
use sharding as late as possible in your systems because once you split the data across shards, joining it back together
1:23:55
is the hardest thing to undo. Luckily, databases like MongoDB already have sharding built in so that we don't have
1:24:02
to implement it ourselves. Now, let's try one more lab. In this lab, you'll set up a primary database and a replica
Free Lab 4 - Replication
1:24:08
of it. You'll add a row, then read it from the copy and see it show up a little late as compared to the primary
1:24:15
database. Next, you'll shut the main one down and let the copy take over. You'll also see
1:24:21
the replica blindly copy your delete commands, too. The lab link is in the description.
The Design We Made So Far
1:24:27
Let's zoom out and revisit our design till now. When a user opens our photo app, the request first reaches the load
1:24:33
balancer and the load balancer forwards the request to one of our 10 stateless servers. The login sessions of all users
1:24:39
live in a shared Reddis store. This makes sure that any server can handle any user. When a server needs data, the
1:24:46
server first checks the Reddis cache. The cache keeps the hot data like trending photos and popular profiles.
1:24:51
And we keep the cache in sync with the database using TTLs and cache and validation. Behind the cache, our
1:24:57
structured data lives in Postgress, users, photos, likes, comments, and follows. And we did indexing to speed up
1:25:04
the queries. But Postgress, our database is no longer a single machine. We now have one primary database that takes all
1:25:10
the writes and two replicas that answer the reads with a load balancer spreading the read queries across all three
1:25:16
copies. We also have our NoSQL MongoDB database that stores our unstructured
1:25:21
data like user preferences and user behavior. And if one day our data grows beyond what one database machine can
1:25:27
hold, we can use sharding to split the data into multiple databases. This is the complete design till now.
1:25:33
And we will keep adding components to this design as our app grows.