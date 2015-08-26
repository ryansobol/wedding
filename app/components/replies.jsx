var Replies = React.createClass({
  getInitialState: function() {
    return { replies: [] };
  },

  componentWillMount: function() {
    this.firebaseRef = new Firebase(
      'https://janeandryanwedding.firebaseio.com/replies'
    );

    this.firebaseRef.on('child_added', function(dataSnapshot) {
      var replies = this.state.replies;

      replies.push(dataSnapshot.val());

      this.setState({ replies: replies });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.firebaseRef.off();
  },

  render: function() {
    var replies = this.state.replies.map(function(reply, key) {
      return (
        <tr key={key}>
          <td>{reply.partyMembers}</td>
          <td>{reply.weddingIntention}</td>
          <td>{reply.mauiIntention}</td>
          <td>{reply.kauaiIntention}</td>
          <td>{reply.message}</td>
        </tr>
      );
    });

    return (
      <table>
        <tr>
          <th>Party Members</th>
          <th>Wedding Intention</th>
          <th>Maui Intention</th>
          <th>Kauai Intention</th>
          <th>Message</th>
        </tr>

        {replies}
      </table>
    );
  }
});

module.exports = Replies;
