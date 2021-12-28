export interface ButtonProps {
  /**
   * If `true`, the button will show a spinner.
   */
  loading: boolean;
}

export function Button(props: ButtonProps) {
  const { loading } = props

  return (
    <button
      disabled={loading}
    >
    </button>
  )
}
