import React from 'react';
import Modal from './Modal';

interface SyncSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SyncSessionModal: React.FC<SyncSessionModalProps> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Start Sync Session</h2>
      <p>Real-time session invite for couples/friends will appear here. (Coming soon!)</p>
    </div>
  </Modal>
);

export default SyncSessionModal; 