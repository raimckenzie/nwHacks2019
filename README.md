# WeGo
Safe, affordable, and sustainable taxi ridesharing

## Inspiration
No one likes being stranded at late hours in an unknown place with unreliable transit as the only safe, affordable option to get home. Between paying for an expensive taxi ride yourself, or sharing a taxi with random street goers, the current options aren't looking great. WeGo aims to streamline taxi ride sharing, creating a safe, efficient and affordable option.

## What it does
WeGo connects you with people around with similar destinations who are also looking to share a taxi. The application aims to reduce taxi costs by splitting rides, improve taxi efficiency by intelligently routing taxi routes and improve sustainability by encouraging ride sharing.

### User Process
1. User logs in to the app/web
2. Nearby riders requesting rides are shown
3. The user then may choose to "request" a ride, by entering a destination.
4. Once the system finds a suitable group of people within close proximity, the user will be send the taxi pickup and rider information. (Taxi request is initiated)
5. User hops on the taxi, along with other members of the application!

## How we built it
The user begins by logging in through their web browser (ReactJS) or mobile device (Android). Through API calls to our NodeJS backend, our system analyzes outstanding requests and intelligently groups people together based on location, user ratings & similar destination - all in real time. 

## Challenges we ran into
A big hurdle we faced was the complexity of our ride analysis algorithm. To create the most cost efficient solution for the user, we wanted to always try to fill up taxi cars completely. This, along with scaling up our system to support multiple locations with high taxi request traffic was definitely a challenge for our team.

## Accomplishments that we're proud of
Looking back on our work over the 24 hours, our team is really excited about a few things about WeGo. First, the fact that we're encouraging sustainability on a city-wide scale is something really important to us. With the future leaning towards autonomous vehicles & taxis, having a similar system like WeGo in place we see as something necessary for the future.

On the technical side, we're really excited to have a single, robust backend that can serve our multiple front end apps. We see this as something necessary for mass adoption of any product, especially for solving a problem like ours.

## What we learned
Our team members definitely learned quite a few things over the last 24 hours at nwHacks! (Both technical and non-technical!)
Working under a time crunch, we really had to rethink how we managed our time to ensure we were always working efficiently and working towards our goal. Coming from different backgrounds, team members learned new technical skills such as interfacing with the Google Maps API, using Node.JS on the backend or developing native mobile apps with Android Studio. Through all of this, we all learned the persistence is key when solving a new problem outside of your comfort zone. (Sometimes you need to throw everything and the kitchen sink at the problem at hand!)

## What's next for WeGo
The team wants to look at improving the overall user experience with better UI, figure out better tools for specificially what we're looking for, and add improved taxi & payment integration services.
