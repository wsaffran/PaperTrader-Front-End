import React from 'react'
import { connect } from 'react-redux'
import { Card, Container, Table } from 'semantic-ui-react'

class UserProfile extends React.Component {

  fullName = () => {
    const { first_name, last_name } = this.props.currentUser
    return first_name.charAt(0).toUpperCase() + first_name.slice(1) + " " + last_name.charAt(0).toUpperCase() + last_name.slice(1)
  }

  renderDescription = () => {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Net Worth</Table.HeaderCell>
            <Table.HeaderCell>Gain</Table.HeaderCell>
            <Table.HeaderCell>Games</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>$10</Table.Cell>
            <Table.Cell>+$2.56</Table.Cell>
            <Table.Cell>13</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

    )
  }

  render () {
    return (
      <Container>
        {this.props.currentUser ?
          <Card>
            <Card.Content header={this.fullName()} />
            <Card.Content description={this.renderDescription()} />
            <Card.Content extra>
            </Card.Content>
          </Card>
          :
          null
        }
      </Container>
    )
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}


export default connect(mapStateToProps)(UserProfile)
