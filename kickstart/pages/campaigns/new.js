import React, { Component } from 'react';
import { Router } from '../../routes';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    pending: false
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ pending: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });

      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ pending: false });
  }

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>

        {/* Exclamations do evaluation in Boolean. */}
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={event => this.setState({ minimumContribution: event.target.value })}
              disabled={this.state.pending} />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button
            primary
            type='submit'
            loading={this.state.pending}
            disabled={this.state.pending}>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;