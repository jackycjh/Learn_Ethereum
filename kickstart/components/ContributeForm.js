import React, { Component } from 'react';
import { Router } from '../routes';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMsg: '',
    loading: false
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, errorMsg: '' });

    const campaign = Campaign(this.props.address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      // Both Router.replaceRoute() and location.reload() work...
      Router.replaceRoute(`/campaigns/${this.props.address}`);
      // location.reload();
    } catch (err) {
      this.setState({ errorMsg: err.message });
    }

    // Reset state
    this.setState({ loading: false, value: '' });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
            label="ether"
            labelPosition="right" />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMsg} />
        <Button primary loading={this.state.loading}>Contribute!</Button>
      </Form>
    );
  }
}

export default ContributeForm;