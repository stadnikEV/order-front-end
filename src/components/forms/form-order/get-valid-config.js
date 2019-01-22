
export default ({ status }) => {
  if (status === 'confirmed') {
    return {
      name: true,
      address: true,
      phone: true,
    };
  }

  return {
    name: true,
  };
};
