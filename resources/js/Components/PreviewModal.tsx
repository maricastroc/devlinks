import * as Dialog from '@radix-ui/react-dialog'
import { cleanHTML } from '@/utils/cleanHtml'

type Props = {
  closeModal: () => void
  data: {
    name: string
    body: string
  }
}

export function PreviewModal({ closeModal, data }: Props) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay
        onClick={closeModal}
        className="fixed inset-0 bg-background-primary/70"
      />

      <Dialog.Content className="fixed z-[999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] bg-background-secondary rounded-lg shadow-lg p-6 max-w-[45rem] flex items-start justify-center md:p-8 max-h-[90vh] overflow-y-auto">
        <section
          className={`sm:w-[90vw] max-w-[40rem] rounded-xl bg-background-secondary flex items-center justify-center`}
        >
          <div
            className="w-full p-4 prose text-gray-200 border border-gray-700 rounded-lg shadow"
            dangerouslySetInnerHTML={{ __html: cleanHTML(data.body) }}
          />
        </section>
      </Dialog.Content>

      <style>{`
        .ql-font-monospace {
          font-family: 'Monaco', 'Courier New', monospace;
        }
        .ql-font-serif {
          font-family: 'Georgia', serif;
        }
        .ql-font-sans-serif {
          font-family: 'Arial', sans-serif;
        }
      `}</style>
    </Dialog.Portal>
  )
}
