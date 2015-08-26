var RSVP = React.createClass({
  getInitialState: function() {
    return { reply: {}, isSaving: false, isSaved: false, button: 'Reply' };
  },

  componentWillMount: function() {
    this.firebaseRef = new Firebase(
      'https://janeandryanwedding.firebaseio.com/replies'
    );

    if (localStorage['replies']) {
      this.replies = JSON.parse(localStorage['replies']);
    } else {
      this.replies = [];
    }
  },

  render: function() {
    return (
      <div>
        <h3>RSVP</h3>

        <section>
          <p>
            The favor of a reply is kindly requested by <strong>November 7th</strong>.
          </p>

          <textarea
            rows='4'
            tabIndex='1'
            placeholder='Names of your party members'
            value={this.state.reply.partyMembers}
            onChange={this.handleChange.bind(null, 'partyMembers')}>
          </textarea>

          <h4>Wedding on Maui, April 12th</h4>

          <label>
            <input
              type='checkbox'
              value='accept'
              checked={this.state.reply.weddingIntention === 'accept'}
              onChange={this.handleChange.bind(null, 'weddingIntention')} />

            <span className='checkbox' tabIndex='2'>✓</span>
            Accept with pleasure
          </label>

          <label>
            <input
              type='checkbox'
              value='decline'
              checked={this.state.reply.weddingIntention === 'decline'}
              onChange={this.handleChange.bind(null, 'weddingIntention')} />

            <span className='checkbox' tabIndex='3'>✓</span>
            Decline with regret
          </label>

          <h4>Vacation on Maui, April 7–13</h4>

          <label>
            <input
              type='checkbox'
              value='interested'
              checked={this.state.reply.mauiIntention === 'interested'}
              onChange={this.handleChange.bind(null, 'mauiIntention')} />

            <span className='checkbox' tabIndex='4'>✓</span>
            Interested in some or all
          </label>

          <label>
            <input
              type='checkbox'
              value='decline'
              checked={this.state.reply.mauiIntention === 'decline'}
              onChange={this.handleChange.bind(null, 'mauiIntention')} />

            <span className='checkbox' tabIndex='5'>✓</span>
            Decline with regret
          </label>

          <h4>Vacation on Kauai, April 14—20</h4>

          <label>
            <input
              type='checkbox'
              value='interested'
              checked={this.state.reply.kauaiIntention === 'interested'}
              onChange={this.handleChange.bind(null, 'kauaiIntention')} />

            <span className='checkbox' tabIndex='6'>✓</span>
            Interested in some or all
          </label>

          <label>
            <input
              type='checkbox'
              value='decline'
              checked={this.state.reply.kauaiIntention === 'decline'}
              onChange={this.handleChange.bind(null, 'kauaiIntention')} />

            <span className='checkbox' tabIndex='7'>✓</span>
            Decline with regret
          </label>

          <textarea
            rows='4'
            tabIndex='8'
            className='message'
            placeholder='Optional message…'
            value={this.state.reply.message}
            onChange={this.handleChange.bind(null, 'message')}>
          </textarea>

          {!this.isValidState() ? <h6>Please include your full name and intentions for each event.</h6> : null}

          <button
            type='button'
            tabIndex='9'
            disabled={!this.isValidState() || this.state.isSaving}
            className={this.isValidState() ? null : 'invalid'}
            onClick={this.handleClick}>

            <i className='fa fa-envelope-o'></i>
            {this.state.button}
          </button>

          {this.state.isSaved ? <h6>Your reply has been sent. Thank you!</h6> : null}
        </section>
      </div>
    );
  },

  isValidState: function() {
    return (
      this.state.reply.partyMembers &&
      this.state.reply.partyMembers.trim() !== '' &&
      this.state.reply.weddingIntention &&
      this.state.reply.mauiIntention &&
      this.state.reply.kauaiIntention
    );
  },

  handleChange: function(key, event) {
    var reply = this.state.reply;
    reply[key] = event.target.value;
    this.setState({ reply: reply, isSaved: false });
  },

  handleClick: function() {
    if (this.state.isSaving) {
      return;
    }

    this.setState({ isSaving: true, button: 'Replying...' });

    var ref = this.firebaseRef.push(this.state.reply, function(error) {
      if (error) {
        console.warn('Data could not be saved.' + error);
        return;
      }

      this.replies.push(ref.key());

      localStorage['replies'] = JSON.stringify(this.replies);

      setTimeout(function() {
        this.setState({
          isSaving: false,
          isSaved: true,
          button: 'Reply Again'
        });
      }.bind(this), 400);

    }.bind(this));
  }
});

module.exports = RSVP;
