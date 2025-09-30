export const getTransactionId = () => {
    return `trx_${Date.now()}_${Math.ceil(Math.random() * 1000)}`;
};
