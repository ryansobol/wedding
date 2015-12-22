var Replies = React.createClass({
  getInitialState: function() {
    return { replies: [] };
  },

  componentWillMount: function() {
    this.firebaseRef = new Firebase(
      'https://janeandryanwedding.firebaseio.com/replies'
    );

    this.firebaseRef.on('child_added', this.onChildAdded);

    this.kauaiReplies = [];
    this.weddingReplies = [];
  },

  componentWillUnmount: function() {
    this.firebaseRef.off();
  },

  onChildAdded: function(dataSnapshot) {
    var replies = this.state.replies;

    replies.push(dataSnapshot.val());

    this.kauaiReplies = this.state.replies.filter(function(reply) {
      return reply.kauaiIntention === 'interested';
    });

    this.weddingReplies = this.state.replies.filter(function(reply) {
      return reply.weddingIntention === 'accept';
    });

    this.setState({ replies: replies });
  },

  render: function() {
    var weddingReplies = this.weddingReplies.map(function(reply, key) {
      return <tr key={key}>
        <td>{reply.partyMembers}</td>
        <td>{reply.weddingIntention}</td>
        <td>{reply.mauiIntention}</td>
      </tr>;
    });

    var kauaiReplies = this.kauaiReplies.map(function(reply, key) {
      return <tr key={key}>
        <td>{reply.partyMembers}</td>
      </tr>;
    });

    return <div>
      <h3>Wedding Replies ({weddingReplies.length})</h3>
      <table>
        <tr>
          <th>Name</th>
          <th>Wedding Intention</th>
          <th>Maui Intention</th>
        </tr>

        {weddingReplies}
      </table>

      <h3>Kauai Replies ({kauaiReplies.length})</h3>
      <table>
        <tr>
          <th>Name</th>
        </tr>

        {kauaiReplies}
      </table>
    </div>;
  }
});

module.exports = Replies;
