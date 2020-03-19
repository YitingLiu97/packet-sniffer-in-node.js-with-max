// this is needed for the node for max 
const maxApi = require('max-api');

const pcap = require('pcap');
const tcp_tracker = new pcap.TCPTracker();
const pcap_session = pcap.createSession("", "tcp");
let packet;

tcp_tracker.on('start', function (session) {
    console.log("Start of TCP session between " + session.src_name + " and " + session.dst_name);
});

tcp_tracker.on('end', function (session) {
    console.log("End of TCP session between " + session.src_name + " and " + session.dst_name);
});


pcap_session.on('packet', function (raw_packet) {
     packet = pcap.decode.packet(raw_packet);
    tcp_tracker.track_packet(packet);
    console.log(packet);
});

//maxApi function corresponding to the Max
maxApi.addHandler('makeRequest',function(){
    maxApi.print('working');
    //sending the raw packet
    maxApi.outlet(packet);

});




// var pcap = require('pcap'),
//     tcp_tracker = new pcap.TCPTracker(),
//     pcap_session = pcap.createSession('en0', { filter: "ip proto \\tcp" });
 
// tcp_tracker.on('session', function (session) {
//   console.log("Start of session between " + session.src_name + " and " + session.dst_name);
//   session.on('end', function (session) {
//       console.log("End of TCP session between " + session.src_name + " and " + session.dst_name);
//   });
// });
 
// pcap_session.on('packet', function (raw_packet) {
//     var packet = pcap.decode.packet(raw_packet);
//     tcp_tracker.track_packet(packet);
//     console.log(packet);
// });