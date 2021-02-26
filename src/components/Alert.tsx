export interface AlertMessage {
    alertMessage : string,
    alertType?: string
}

const Alert: React.FC<AlertMessage> = ({alertMessage, alertType}) => {
  return (
    <div
      className={`alert alert-${alertType} alert-dismissible fade show`}
      role="alert"
    >
      <strong>Holy guacamole!</strong> {alertMessage}
      
    </div>
  );
};

Alert.defaultProps = {
    alertType: "danger"
}

export default Alert;
