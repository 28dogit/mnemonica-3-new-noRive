export const useScrollLock = () => {
  const isScrollLocked = useState('scroll-locked', () => false)
  
  const lockScroll = () => {
    isScrollLocked.value = true
  }
  
  const unlockScroll = () => {
    isScrollLocked.value = false
  }
  
  return {
    isScrollLocked,
    lockScroll,
    unlockScroll
  }
}