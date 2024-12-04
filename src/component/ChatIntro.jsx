import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
function ChatIntro() {
  return (
    <div  style={styles.chattingPage}>
        <div className="frontpage" style={{ display: 'flex',flexDirection:'column', alignItems: 'center', justifyContent: 'center' }}>
        <FontAwesomeIcon icon={faWhatsapp} style={{ color: "#111816", fontSize: '48px', marginRight: '8px' }} />
        <h6 style={{ fontSize: '18px' }}>Select a user to chat with</h6>
      </div>

    </div>
  )
}
const styles = {
    chattingPage: {        height: '100vh', display: 'flex',justifyContent: 'center' } //gridTemplateColumns: '2fr 5fr',  },
};
export default ChatIntro