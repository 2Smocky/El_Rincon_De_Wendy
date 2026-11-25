import { useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { verifySecretPassword } from '../../lib/wendyFirestore';

interface ActFourContinueProps {
  onReplay: () => void;
  onUnlock: () => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export function ActFourContinue({
  onReplay,
  onUnlock,
  inputRef,
}: ActFourContinueProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [checking, setChecking] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);

  const triggerShake = () => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { x: 0 },
      {
        keyframes: [
          { x: -7, duration: 0.06 },
          { x: 7, duration: 0.06 },
          { x: -5, duration: 0.06 },
          { x: 5, duration: 0.06 },
          { x: 0, duration: 0.08 },
        ],
        ease: 'power2.out',
      }
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (checking) return;

    const trimmed = password.trim();
    if (!trimmed) {
      setErrorMessage('Escribe nuestra clave secreta antes de continuar.');
      triggerShake();
      return;
    }

    if (/\s/.test(trimmed)) {
      setErrorMessage('Recuerda la pista: no uses espacios, usa _ en su lugar.');
      triggerShake();
      return;
    }

    setChecking(true);
    setErrorMessage('');

    try {
      const isValid = await verifySecretPassword(password);
      if (!isValid) {
        setErrorMessage('Esa aún no es la clave secreta, mi amor. Intenta otra vez.');
        triggerShake();
        return;
      }
      onUnlock();
    } catch {
      setErrorMessage(
        'No pudimos verificar la clave en este momento. Revisa tu conexión e intenta de nuevo.'
      );
      triggerShake();
    } finally {
      setChecking(false);
    }
  };

  return (
    <section
      className="act-layer act-continue"
      data-anim="act-continue"
      aria-label="Continuará y contraseña secreta"
    >
      <div className="continue-twilight-glow" aria-hidden="true" />

      <div className="continue-header" data-anim="continue-header">
        <h2 className="continue-heading">Continuará...</h2>
        <p className="continue-subtext">
          Porque nuestra historia todavía guarda capítulos escritos solo para ti.
        </p>
      </div>

      <div className="password-card" ref={cardRef} data-anim="password-card">
        <div className="wax-seal-crest" aria-hidden="true">
          <svg width="52" height="52" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="25" fill="#C85A6E" />
            <circle
              cx="28"
              cy="28"
              r="21"
              fill="none"
              stroke="#F4C97A"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <path
              d="M28 40 C28 40 16 32.2 16 23.8 C16 19.4 19.3 16 23.4 16 C25.7 16 27.2 17.2 28 19.1 C28.8 17.2 30.3 16 32.6 16 C36.7 16 40 19.4 40 23.8 C40 32.2 28 40 28 40Z"
              fill="#FFFAF4"
            />
            <circle cx="28" cy="25.5" r="2.2" fill="#C85A6E" />
            <path
              d="M27.2 27 L28.8 27 L29.3 32 L26.7 32 Z"
              fill="#C85A6E"
            />
          </svg>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <label className="password-label" htmlFor="wendy-password">
            Ingresa la contraseña secreta
          </label>

          <div className="password-input-group">
            <input
              ref={inputRef}
              id="wendy-password"
              className="password-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              disabled={checking}
              autoComplete="off"
              placeholder="Escribe nuestra clave..."
              aria-invalid={errorMessage ? 'true' : 'false'}
              aria-describedby={
                errorMessage
                  ? 'wendy-password-hint wendy-password-error'
                  : 'wendy-password-hint'
              }
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
            />

            <button
              type="button"
              className="password-toggle-btn"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M3 3 L21 21 M10.6 10.6 A3 3 0 0 0 13.4 13.4 M9.9 5.1 A10.5 10.5 0 0 1 12 4.9 C17 4.9 21 12 21 12 A17.4 17.4 0 0 1 17.7 16.4 M6.6 6.6 A17.3 17.3 0 0 0 3 12 C3 12 7 19.1 12 19.1 C13.7 19.1 15.3 18.6 16.6 17.8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M2.5 12 C4.8 7.5 8.1 5.2 12 5.2 C15.9 5.2 19.2 7.5 21.5 12 C19.2 16.5 15.9 18.8 12 18.8 C8.1 18.8 4.8 16.5 2.5 12 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                  />
                </svg>
              )}
            </button>
          </div>

          <p id="wendy-password-hint" className="password-hint">
            Pista: no uses espacios, usa <code>_</code>
          </p>

          {errorMessage && (
            <p id="wendy-password-error" className="password-error" role="alert">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="password-submit-btn"
            disabled={checking}
          >
            <span>
              {checking ? 'Abriendo nuestro rincón...' : 'Abrir siguiente capítulo'}
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M5 12 H19 M13 6 L19 12 L13 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>

      <button
        type="button"
        className="replay-story-btn"
        data-anim="replay-btn"
        onClick={onReplay}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M3 12 A9 9 0 1 0 6 5.6 L3 8.5 M3 3.5 V8.5 H8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Volver a ver nuestra historia</span>
      </button>
    </section>
  );
}
