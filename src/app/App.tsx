import {useState} from "react";
import {useAppSelector} from "../store";
import Modal from "../components/Modal";
import styles from "./App.module.scss";
import Uncontrolled from "../components/Forms/Uncontrolled";
import ReactHook from "../components/Forms/ReactHook";
import SubmitTile from "../components/SubmitTile";
import {formSelector} from "../store/slices/formSlice";

const App = () => {
  const [activeModal, setActiveModal] = useState<"uncontrolled" | "controlled" | null>(null);
  const {submissions} = useAppSelector(formSelector);

  return (
    <div className={styles.mainPage}>
      <div className={styles.header}>
        <h1>Form Submissions</h1>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => setActiveModal("uncontrolled")}
            className={styles.button}>
            Open Uncontrolled Form
          </button>
          <button
            onClick={() => setActiveModal("controlled")}
            className={styles.button}>
            Open Controlled Form
          </button>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No submissions yet. Click a button above to get started!</p>
        </div>
      ) : (
        <div className={styles.submissionsGrid}>
          {submissions.map((submission) => (
            <SubmitTile
              key={submission.id}
              submission={submission}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={activeModal === "uncontrolled"}
        onClose={() => setActiveModal(null)}
        ariaLabel="Uncontrolled Form Modal">
        <Uncontrolled onClose={() => setActiveModal(null)} />
      </Modal>

      <Modal
        isOpen={activeModal === "controlled"}
        onClose={() => setActiveModal(null)}
        ariaLabel="Controlled Form Modal">
        <ReactHook onClose={() => setActiveModal(null)} />
      </Modal>
    </div>
  );
};

export default App;
