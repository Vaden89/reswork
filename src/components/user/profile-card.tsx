import { useAuth } from '#/context/auth.context'
import { Navii } from '@usenavii/react'

export const ProfileCard = () => {
  const { user } = useAuth()

  return (
    <div className="flex items-center text-sm gap-2">
      <div className="rounded-full">
        <Navii
          seed={user?.id ?? 'guest'}
          size={32}
          title="Guest"
          className="rounded-full"
        />
      </div>
    </div>
  )
}
