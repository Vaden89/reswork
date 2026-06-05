import { Navii } from '@usenavii/react'

export const ProfileCard = () => {
  const uid = crypto.randomUUID()

  return (
    <div className="flex items-center text-sm gap-2">
      <div className="rounded-full">
        <Navii seed={uid} size={32} title="Guest" className="rounded-full" />
      </div>
    </div>
  )
}
