# trainHomework

A simple train schedule application using html/css/javascript&jquery, along with Firebase and Moment.js.

The application receives train schedules input by the user on index.html:
    1. Name of the train.
    2. Destination of the train.
    3. Time the first train left.
    4. Frequency

Then input is then converted with Moment.js to a timetable that inserts the next predicted train arrival into Firebase. 

Upon addition of a child to Firebase, table data is generated reflecting the child's (train that was added by the user):
    1. Name.
    2. Destination.
    3. Frequency.
    4. Time of first departure.
    5. Time of next expected arrival.
    6. Minutes until arrival.

As a bonus for those that do not wish to struggle with estimating military time I have added a small conversion table that allows the user to convert from standard time to military time, as the time they submit for the train schedule requires military time.