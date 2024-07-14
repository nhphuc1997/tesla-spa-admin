const orderResourceOptions = {
  properties: {
    orderId: {
      isDisabled: true, isVisible: {
        edit: false,
        show: false,
        list: false,
        filter: false,
      }
    }
  },
}

export default orderResourceOptions;
