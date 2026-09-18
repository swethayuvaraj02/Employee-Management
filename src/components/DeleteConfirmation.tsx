interface DeleteConfirmationProps {
  employeeName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteConfirmation({
  employeeName,
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div
        className="delete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
      >
        <div className="delete-icon">!</div>

        <h2 id="delete-title">Delete employee?</h2>

        <p>
          Are you sure you want to delete{" "}
          <strong>{employeeName}</strong>? This action cannot be undone.
        </p>

        <div className="modal-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="delete-confirm-button"
            onClick={onConfirm}
          >
            Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;