import gql from 'graphql-tag'

const user = gql`
  fragment UserBasic on User {
    id
    username
  }
`

const scanClass = gql`
  fragment ScanClassBasic on ScanClass {
    id
    name
    description
    rate
  }
`

const tag = gql`
  fragment TagBasic on Tag {
    id
    name
    description
    value
    datatype
    max
    min
    units
    scanClass {
      ...ScanClassBasic
    }
    createdBy {
      ...UserBasic
    }
  }
  ${user}
  ${scanClass}
`

const modbusSource = gql`
  fragment ModbusSourceBasic on ModbusSource {
    tag {
      ...TagBasic
    }
    register
    registerType
  }
`

const modbus = gql`
  fragment ModbusBasic on Modbus {
    id
    host
    port
    reverseBits
    reverseWords
    timeout
    retryRate
    sources {
      ...ModbusSourceBasic
    }
    status
    zeroBased
  }
  ${tag}
  ${modbusSource}
`

const ethernetip = gql`
  fragment EthernetIPBasic on EthernetIP {
    id
    host
    slot
    status
  }
  ${tag}
`

const device = gql`
  fragment DeviceBasic on Device {
    id
    name
    description
    createdBy {
      ...UserBasic
    }
    createdOn
    config {
      __typename
      ... on Modbus {
        ...ModbusBasic
      }
      ... on EthernetIP {
        ...EthernetIPBasic
      }
    }
  }
  ${user}
  ${tag}
  ${modbus}
  ${ethernetip}
`

export default {
  user,
  scanClass,
  tag,
  modbusSource,
  modbus,
  device
}
