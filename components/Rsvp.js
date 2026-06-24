'use client'

import { useState, useRef } from 'react'

/* Google Apps Script web-app URL — set in .env.local (see RSVP-SETUP.md) */
const ENDPOINT = process.env.NEXT_PUBLIC_RSVP_ENDPOINT || ''

/* ─── Labels ───────────────────────────────────────────────────── */
const L = {
  en: {
    heading: 'RSVP',
    sub: 'Kindly confirm your presence',
    name: 'Full Name',
    place: 'Place / Town',
    whatsapp: 'WhatsApp Number',
    relation: 'Relation',
    friend: 'Friend',
    family: 'Family',
    attending: 'Will you attend?',
    yes: 'Yes',
    no: 'No',
    guests: 'Number of guests (incl. you)',
    transportHeading: 'Transportation',
    t1: 'Transport from Kodungallur to the reception hall?',
    t2: 'Transport from the hall back to Kodungallur?',
    t3: 'Transport from the hall to Ernakulam Railway Stations (South & North)?',
    submit: 'Send RSVP',
    sending: 'Sending…',
    successTitle: 'JazākAllāhu Khayran!',
    successMsg: 'Your RSVP has been received. We look forward to celebrating with you, inshāAllah.',
    errVal: 'Please complete the required fields.',
    errPhone: 'Please enter a valid WhatsApp number.',
    errSend: 'Something went wrong. Please try again.',
    errConfig: 'RSVP is not yet connected. Please contact the family directly.',
  },
  ml: {
    heading: 'സാന്നിധ്യം അറിയിക്കുക',
    sub: 'ദയവായി നിങ്ങളുടെ സാന്നിധ്യം സ്ഥിരീകരിക്കുക',
    name: 'പൂർണ്ണ നാമം',
    place: 'സ്ഥലം',
    whatsapp: 'വാട്സ്ആപ്പ് നമ്പർ',
    relation: 'ബന്ധം',
    friend: 'സുഹൃത്ത്',
    family: 'കുടുംബം',
    attending: 'നിങ്ങൾ പങ്കെടുക്കുമോ?',
    yes: 'ഉണ്ട്',
    no: 'ഇല്ല',
    guests: 'എത്ര പേർ (നിങ്ങൾ ഉൾപ്പെടെ)',
    transportHeading: 'യാത്രാ സൗകര്യം',
    t1: 'കൊടുങ്ങല്ലൂരിൽ നിന്ന് റിസപ്ഷൻ ഹാളിലേക്ക് യാത്രാ സൗകര്യം വേണോ?',
    t2: 'ഹാളിൽ നിന്ന് തിരികെ കൊടുങ്ങല്ലൂരിലേക്ക് യാത്രാ സൗകര്യം വേണോ?',
    t3: 'ഹാളിൽ നിന്ന് എറണാകുളം റെയിൽവേ സ്റ്റേഷനുകളിലേക്ക് (സൗത്ത് & നോർത്ത്) യാത്രാ സൗകര്യം വേണോ?',
    submit: 'അറിയിക്കുക',
    sending: 'അയക്കുന്നു…',
    successTitle: 'ജസാകല്ലാഹു ഖൈർ!',
    successMsg: 'നിങ്ങളുടെ സ്ഥിരീകരണം ലഭിച്ചു. നിങ്ങളെ കാണാൻ ഞങ്ങൾ കാത്തിരിക്കുന്നു.',
    errVal: 'ദയവായി ആവശ്യമായ വിവരങ്ങൾ പൂരിപ്പിക്കുക.',
    errPhone: 'ദയവായി സാധുവായ വാട്സ്ആപ്പ് നമ്പർ നൽകുക.',
    errSend: 'എന്തോ പിശക് സംഭവിച്ചു. വീണ്ടും ശ്രമിക്കുക.',
    errConfig: 'RSVP ഇതുവരെ ബന്ധിപ്പിച്ചിട്ടില്ല. ദയവായി കുടുംബവുമായി നേരിട്ട് ബന്ധപ്പെടുക.',
  },
}

const GOLD = '#C9A84C'
const MUTED = '#9B7B3A'

/* ─── Component ────────────────────────────────────────────────── */
export default function Rsvp({ side = 'bride', isMl = false, lang = 'en', dark = false }) {
  const t = L[isMl ? 'ml' : 'en']
  const bodyFont = isMl ? 'var(--font-noto-ml)' : 'var(--font-cormorant)'
  const showTransport = side === 'groom'

  // theme tokens
  const CARD = dark ? 'rgba(20,14,8,0.6)' : '#fff'
  const FG = dark ? '#F3E9D2' : '#2C1810'
  const SUB = dark ? '#d8c79a' : '#5C4033'
  const LABEL = dark ? '#C9A84C' : MUTED

  const [form, setForm] = useState({
    name: '', place: '', whatsapp: '', relation: '', attending: 'yes', guests: '1',
    t_to_hall: 'no', t_from_hall: 'no', t_to_station: 'no',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errMsg, setErrMsg] = useState('')
  const formRef = useRef(null)

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }))
  const onInput = (k) => (e) => set(k)(e.target.value)

  const labelStyle = {
    display: 'block',
    color: LABEL,
    fontSize: '0.72rem',
    textTransform: isMl ? 'none' : 'uppercase',
    letterSpacing: isMl ? '0.03em' : '0.16em',
    marginBottom: '8px',
    fontFamily: isMl ? 'var(--font-noto-ml)' : undefined,
  }
  const fieldStyle = { marginBottom: '22px' }
  const reqMark = <span style={{ color: GOLD, marginLeft: '3px' }} aria-hidden="true">*</span>

  /* Segmented yes/no or friend/family control */
  const Choice = ({ field, value, children }) => {
    const active = form[field] === value
    return (
      <button
        type="button"
        onClick={() => set(field)(value)}
        aria-pressed={active}
        style={{
          flex: 1,
          minHeight: '46px',
          padding: '10px 12px',
          border: `1px solid ${active ? GOLD : 'rgba(201,168,76,0.32)'}`,
          background: active ? 'rgba(201,168,76,0.18)' : (dark ? 'rgba(20,14,8,0.4)' : 'rgba(255,255,255,0.5)'),
          color: active ? (dark ? '#F3E9D2' : '#8B6914') : LABEL,
          fontFamily: bodyFont,
          fontSize: isMl ? '0.95rem' : '0.95rem',
          fontWeight: active ? 600 : 400,
          cursor: 'pointer',
          transition: 'border-color .2s, background-color .2s, color .2s',
        }}
      >
        {children}
      </button>
    )
  }

  const TransportRow = ({ field, label }) => (
    <div style={{ marginBottom: '18px' }}>
      <p style={{ color: SUB, fontSize: isMl ? '0.92rem' : '0.95rem', fontFamily: bodyFont, lineHeight: 1.5, marginBottom: '10px' }}>
        {label}
      </p>
      <div style={{ display: 'flex', gap: '10px', maxWidth: '220px' }}>
        <Choice field={field} value="yes">{t.yes}</Choice>
        <Choice field={field} value="no">{t.no}</Choice>
      </div>
    </div>
  )

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = true
    if (!form.place.trim()) e.place = true
    if (!form.relation) e.relation = true
    const phone = form.whatsapp.replace(/[\s-]/g, '')
    if (!/^\+?\d{10,13}$/.test(phone)) e.whatsapp = true
    setErrors(e)
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) {
      setStatus('error')
      setErrMsg(e.whatsapp && Object.keys(e).length === 1 ? t.errPhone : t.errVal)
      // focus first invalid field
      const first = ['name', 'place', 'whatsapp', 'relation'].find((k) => e[k])
      const el = formRef.current?.querySelector(`[name="${first}"]`)
      el?.focus()
      return
    }
    if (!ENDPOINT) {
      setStatus('error')
      setErrMsg(t.errConfig)
      return
    }
    setStatus('sending')
    setErrMsg('')
    try {
      const payload = {
        side,
        lang,
        name: form.name.trim(),
        place: form.place.trim(),
        whatsapp: form.whatsapp.replace(/[\s-]/g, ''),
        relation: form.relation,
        attending: form.attending,
        guests: form.guests,
        t_to_hall: showTransport && form.attending === 'yes' ? form.t_to_hall : '',
        t_from_hall: showTransport && form.attending === 'yes' ? form.t_from_hall : '',
        t_to_station: showTransport && form.attending === 'yes' ? form.t_to_station : '',
      }
      await fetch(ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(),
      })
      // no-cors gives an opaque response; reaching here means the request was sent
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrMsg(t.errSend)
    }
  }

  /* ── Success state ── */
  if (status === 'success') {
    return (
      <section
        aria-live="polite"
        style={{
          background: CARD,
          border: `1px solid rgba(201,168,76,0.22)`,
          boxShadow: dark ? 'none' : '0 4px 32px rgba(201,168,76,0.07)',
          padding: '40px 28px',
          marginBottom: '36px',
          textAlign: 'center',
        }}
      >
        <div className="anim-shimmer" style={{ color: GOLD, fontSize: '1.6rem', marginBottom: '14px' }}>✦</div>
        <h3 style={{ fontFamily: bodyFont, color: FG, fontSize: isMl ? '1.4rem' : '1.7rem', fontWeight: 400, fontStyle: isMl ? 'normal' : 'italic', marginBottom: '12px' }}>
          {t.successTitle}
        </h3>
        <div className="divider" style={{ width: '56px', margin: '0 auto 16px' }} />
        <p style={{ color: SUB, fontSize: isMl ? '0.92rem' : '1rem', fontFamily: bodyFont, lineHeight: 1.7, maxWidth: '380px', margin: '0 auto' }}>
          {t.successMsg}
        </p>
      </section>
    )
  }

  /* ── Form ── */
  return (
    <section style={{ marginBottom: '36px' }}>
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <p style={{ color: GOLD, fontSize: '0.72rem', textTransform: isMl ? 'none' : 'uppercase', letterSpacing: isMl ? '0.04em' : '0.28em', marginBottom: '6px', fontFamily: isMl ? 'var(--font-noto-ml)' : undefined }}>
          {t.heading}
        </p>
        <p style={{ color: LABEL, fontSize: isMl ? '0.95rem' : '1.05rem', fontFamily: bodyFont, fontStyle: isMl ? 'normal' : 'italic' }}>
          {t.sub}
        </p>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        style={{
          background: CARD,
          border: `1px solid rgba(201,168,76,0.22)`,
          boxShadow: dark ? 'none' : '0 4px 32px rgba(201,168,76,0.07)',
          padding: '32px 26px',
        }}
      >
        {/* Name */}
        <div style={fieldStyle}>
          <label htmlFor="rsvp-name" style={labelStyle}>{t.name}{reqMark}</label>
          <input
            id="rsvp-name" name="name" type="text" autoComplete="name"
            value={form.name} onChange={onInput('name')}
            className={`rsvp-input${dark ? " dark" : ""}`} aria-invalid={!!errors.name}
            style={{ fontFamily: bodyFont, borderColor: errors.name ? '#C0392B' : undefined }}
          />
        </div>

        {/* Place */}
        <div style={fieldStyle}>
          <label htmlFor="rsvp-place" style={labelStyle}>{t.place}{reqMark}</label>
          <input
            id="rsvp-place" name="place" type="text" autoComplete="address-level2"
            value={form.place} onChange={onInput('place')}
            className={`rsvp-input${dark ? " dark" : ""}`} aria-invalid={!!errors.place}
            style={{ fontFamily: bodyFont, borderColor: errors.place ? '#C0392B' : undefined }}
          />
        </div>

        {/* WhatsApp */}
        <div style={fieldStyle}>
          <label htmlFor="rsvp-whatsapp" style={labelStyle}>{t.whatsapp}{reqMark}</label>
          <input
            id="rsvp-whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel"
            placeholder="+91 9XXXXXXXXX"
            value={form.whatsapp} onChange={onInput('whatsapp')}
            className={`rsvp-input${dark ? " dark" : ""}`} aria-invalid={!!errors.whatsapp}
            style={{ fontFamily: bodyFont, borderColor: errors.whatsapp ? '#C0392B' : undefined }}
          />
        </div>

        {/* Relation */}
        <div style={fieldStyle}>
          <span style={labelStyle}>{t.relation}{reqMark}</span>
          <div style={{ display: 'flex', gap: '10px' }} role="group" aria-label={t.relation}>
            <Choice field="relation" value="friend">{t.friend}</Choice>
            <Choice field="relation" value="family">{t.family}</Choice>
          </div>
          {errors.relation && <input type="hidden" name="relation" />}
        </div>

        {/* Attending */}
        <div style={fieldStyle}>
          <span style={labelStyle}>{t.attending}{reqMark}</span>
          <div style={{ display: 'flex', gap: '10px', maxWidth: '220px' }} role="group" aria-label={t.attending}>
            <Choice field="attending" value="yes">{t.yes}</Choice>
            <Choice field="attending" value="no">{t.no}</Choice>
          </div>
        </div>

        {/* Guests (only if attending) */}
        {form.attending === 'yes' && (
          <div style={fieldStyle}>
            <label htmlFor="rsvp-guests" style={labelStyle}>{t.guests}</label>
            <input
              id="rsvp-guests" name="guests" type="number" inputMode="numeric" min="1" max="20"
              value={form.guests} onChange={onInput('guests')}
              className={`rsvp-input${dark ? " dark" : ""}`}
              style={{ fontFamily: bodyFont, maxWidth: '120px' }}
            />
          </div>
        )}

        {/* Transport (groom side, attending only) */}
        {showTransport && form.attending === 'yes' && (
          <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(201,168,76,0.18)' }}>
            <p style={{ color: GOLD, fontSize: '0.72rem', textTransform: isMl ? 'none' : 'uppercase', letterSpacing: isMl ? '0.04em' : '0.22em', marginBottom: '18px', fontFamily: isMl ? 'var(--font-noto-ml)' : undefined }}>
              {t.transportHeading}
            </p>
            <TransportRow field="t_to_hall" label={t.t1} />
            <TransportRow field="t_from_hall" label={t.t2} />
            <TransportRow field="t_to_station" label={t.t3} />
          </div>
        )}

        {/* Error message */}
        {status === 'error' && errMsg && (
          <p role="alert" aria-live="assertive" style={{ color: '#C0392B', fontSize: '0.85rem', fontFamily: bodyFont, marginBottom: '16px', textAlign: 'center' }}>
            {errMsg}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="map-btn"
          style={{
            width: '100%',
            minHeight: '50px',
            marginTop: '8px',
            border: `1px solid ${GOLD}`,
            background: status === 'sending' ? 'rgba(201,168,76,0.4)' : GOLD,
            color: '#fff',
            fontSize: '0.78rem',
            textTransform: isMl ? 'none' : 'uppercase',
            letterSpacing: isMl ? '0.04em' : '0.2em',
            fontFamily: isMl ? 'var(--font-noto-ml)' : undefined,
            cursor: status === 'sending' ? 'default' : 'pointer',
            opacity: status === 'sending' ? 0.7 : 1,
          }}
        >
          {status === 'sending' ? t.sending : t.submit}
        </button>
      </form>
    </section>
  )
}
