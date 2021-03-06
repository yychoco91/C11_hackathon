/**
 * Created by kevin on 10/26/16.
 */
$(document).ready(click);

function click(){
    console.log('in click handlers');
    $('button').click(function () {
        var userSearch = $('#search').val();
        var userZip = 92626; //$('#zip').val();
        console.log(userSearch, userZip);
        getTopics(userSearch, userZip);
    });
}
/**
 * getTopics - using user-entered interest, generate topics and use first 2 urlkeys
 * @param {string} keyword - user-entered interest
 * @param {number} zipcode - user-entered zipcode
 */
function getTopics(keyword, zipcode) {
    console.log('get stuff');
    var userKeyword = keyword;
    $.ajax({
        dataType: 'jsonp',
        url: 'https://api.meetup.com/topics?search=' + userKeyword + '&page=5&key=702403fb782d606165f7638a242a&sign=true',
        method: 'get',
        success: function (response) {
            console.log('UrlKeys:', response.results);
            var topics = '';
            if(response.results.length > 0){
                console.log('Result is true');
                for(var i = 0; i < response.results.length; i++){
                    console.log('in for loop');
                    if(i !== response.results.length-1){
                        topics += response.results[i]['urlkey'] + ',';
                    }else{
                        topics += response.results[i]['urlkey'];
                    }
                }
            }
            console.log('Topics', topics);
            getEvents(topics, zipcode);
        }
    });
}

function getEvents(keyword, zip) {
    var userKeyword = keyword;
    var userZip = zip;
    $.ajax({
        dataType: 'jsonp',
        url: 'https://api.meetup.com/2/open_events?key=702403fb782d606165f7638a242a&zip=' + userZip + '&topic=' + userKeyword + '&page=20',
        method: 'get',
        success: function (response) {
            var eventList = response.results; //limit to display only 20 events. Create divs and style later
            console.log('Event list', eventList);

           createEventCard(eventList);


        }
    });
}

function createEventCard(eventList) {
    var eventName=eventList[i]['name'];
    var groupName=eventList[i].group.name;
    var date=new Date(eventList[i]['time']);
    var venueName=eventList[i].venue.name;
    var address=eventList[i].venue.address_1;
    var city=eventList[i].venue.city;
    var state=eventList[i].venue.state;

    for ( var i = 0; i < eventList.length; i++) {
        $('<span>', {
            class: card-title,
            text: eventName+groupName
        });

        $('<p>', {
            text: date
        });

        $('<p>', {
            text: venueName
        });

        $('<p>', {
            text: address + city + state
        });

        $('<div>',{
            class: 'card-content white-text'
        }).append(eventName,groupName,date,venueName,address,city,state)
    }}

