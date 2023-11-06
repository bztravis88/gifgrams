'use client'

import { useRouter } from 'next/navigation'
import styleBuilder from '@/util/styleBuilder'
import emitToast from '@/ui/Toast'
import UndoLeftRoundSquare from '@/public/icons/UndoLeftRoundSquare.svg'
import styles from '@/styles/components/CardControls.module.scss'

const reactions = ['😁', '😂', '❤️', '🙏', '🥳']

export default function CardControls({ isFront, cardId }) {
  const router = useRouter()

  const alertComingSoon = (feature) => {
    alert(`${feature} are coming soon! Hang tight :)`)
  }

  const sendEmojiReaction = (emoji) => {
    fetch('/api/v1/respond/emoji', {
      method: 'POST',
      body: JSON.stringify({
        cardId: cardId,
        emoji: emoji,
      }),
    })
      .then((response) => {
        console.log('response', response)
        return response.json()
      })
      .then((data) => {
        console.log('data', data)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  return (
    <div
      className={styleBuilder([styles.container, [styles.isFront, isFront]])}
    >
      <button onClick={() => router.push('/new')}>
        <UndoLeftRoundSquare />
        Send a free response
      </button>
      <div className={styles.reactionContainer}>
        {reactions.map((elem, index) => (
          <button key={index} onClick={() => sendEmojiReaction(elem)}>
            {elem}
          </button>
        ))}
      </div>
    </div>
  )
}
