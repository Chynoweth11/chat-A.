import { AlertTriangle, Check, Send, Sparkles, Upload, Zap } from "lucide-react";
import { policyIcon } from "../icons.js";
import { formatLongDate, formatMoney, getStatus } from "../utils.js";
import { Section, Info, Spinner } from "./Layout.jsx";
import ScoreRing from "./ScoreRing.jsx";

const realAppStyles = {
  trustStrip: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 18,
  },
  trustPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    border: "1px solid rgba(184,117,5,.14)",
    background: "rgba(255,255,255,.66)",
    color: "#5f6673",
    borderRadius: 999,
    padding: "7px 10px",
    fontSize: 12,
    fontWeight: 850,
    boxShadow: "0 8px 18px rgba(20,22,27,.05)",
  },
  livePill: {
    display: "inline-flex",
    alignItems: "center",
    border: "1px solid rgba(11,127,93,.16)",
    background: "#eaf7f1",
    color: "#0b7f5d",
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 11,
    fontWeight: 950,
    textTransform: "uppercase",
    letterSpacing: ".06em",
  },
  nextAction: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    border: "1px solid rgba(229,223,211,.9)",
    background: "linear-gradient(145deg,#fff,#fbf8f1)",
    borderRadius: 18,
    padding: 13,
    margin: "14px 0 16px",
    boxShadow: "0 10px 24px rgba(20,22,27,.05)",
  },
  actionDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    marginTop: 4,
    flex: "0 0 auto",
  },
};

function dotColor(className) {
  if (className === "danger") return { background: "#cf3f35", boxShadow: "0 0 0 5px rgba(207,63,53,.12)" };
  if (className === "warning") return { background: "#c47a07", boxShadow: "0 0 0 5px rgba(196,122,7,.12)" };
  return { background: "#0b7f5d", boxShadow: "0 0 0 5px rgba(11,127,93,.11)" };
}

export default function VaultView({
  score,
  docs,
  critical,
  policies,
  selectedPolicy,
  onSelectPolicy,
  onRenew,
  onShop,
  onSend,
  onScan,
  renewingId,
  shoppingId,
}) {
  return (
    <div className="ss-grid">
      <section className="ss-card ss-span">
        <div className="ss-hero">
          <div>
            <span className="ss-eyebrow">
              {critical.length ? "Action needed" : "Job-site ready"}
            </span>
            <h2>{score}% compliant</h2>
            <p>
              {critical.length
                ? `${critical.length} polic${critical.length === 1 ? "y is" : "ies are"} critical. Renew before routing new COI packages.`
                : "All required policies are current, verified, and ready to route to any GC or client."}
            </p>
            <div className="ss-row">
              <button className="ss-button" onClick={onSend}>
                <Send size={16} /> Send package
              </button>
              <button className="ss-button soft" onClick={onScan}>
                <Upload size={16} /> Add document
              </button>
            </div>
            <div style={realAppStyles.trustStrip} aria-label="SubShield workflow benefits">
              <span style={realAppStyles.trustPill}><Sparkles size={14} /> Upload once</span>
              <span style={realAppStyles.trustPill}><Check size={14} /> Verify documents</span>
              <span style={realAppStyles.trustPill}><Send size={14} /> Send anywhere</span>
            </div>
          </div>
          <ScoreRing value={score} />
        </div>
      </section>

      <section className="ss-card">
        <Section
          title="Insurance vault"
          sub={`${docs} verified files`}
          extra={<span style={realAppStyles.livePill}>Live vault</span>}
        />
        {policies.map((policy) => (
          <PolicyRow
            key={policy.id}
            policy={policy}
            selected={policy.id === selectedPolicy.id}
            onClick={() => onSelectPolicy(policy.id)}
          />
        ))}
      </section>

      <section className="ss-card">
        <PolicyDetail
          policy={selectedPolicy}
          onRenew={() => onRenew(selectedPolicy.id)}
          onShop={() => onShop(selectedPolicy.id)}
          onSend={onSend}
          isRenewing={renewingId === selectedPolicy.id}
          isShopping={shoppingId === selectedPolicy.id}
        />
      </section>
    </div>
  );
}

function PolicyRow({ policy, selected, onClick }) {
  const Icon = policyIcon(policy.type);
  const status = getStatus(policy.daysRemaining);
  return (
    <button
      type="button"
      className={`ss-policy ${selected ? "selected" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="ss-icon-tile" aria-hidden="true">
        <Icon size={20} />
      </span>
      <span className="ss-policy-copy">
        <b>{policy.name}</b>
        <small>
          {policy.carrier} · {policy.policyNumber}
        </small>
      </span>
      <em className={`ss-status ${status.className}`}>{status.label}</em>
    </button>
  );
}

function PolicyDetail({ policy, onRenew, onShop, onSend, isRenewing, isShopping }) {
  const Icon = policyIcon(policy.type);
  const status = getStatus(policy.daysRemaining);
  const width = `${Math.max(5, Math.min(100, (policy.daysRemaining / 180) * 100))}%`;
  const isCritical = status.className === "danger";
  const primaryAction = isCritical
    ? "Renew this policy before sending new packages."
    : "This policy is ready for package routing.";

  return (
    <div>
      <div className="ss-detail-head">
        <span className="ss-icon-tile" aria-hidden="true">
          <Icon size={22} />
        </span>
        <div>
          <span className="ss-eyebrow">Policy detail</span>
          <h2>{policy.name}</h2>
          <p className="ss-muted">
            {policy.carrier} · {policy.policyNumber}
          </p>
        </div>
      </div>

      <div style={realAppStyles.nextAction}>
        <span style={{ ...realAppStyles.actionDot, ...dotColor(status.className) }} />
        <div>
          <b>Recommended next step</b>
          <small style={{ display: "block", color: "#667085", lineHeight: 1.4, marginTop: 3 }}>{primaryAction}</small>
        </div>
      </div>

      <div className="ss-bar-top">
        <span>{policy.daysRemaining} days left</span>
        <span>{formatMoney(policy.premium)}/yr</span>
      </div>
      <div className="ss-bar">
        <span className={status.className} style={{ width }} />
      </div>

      <div className="ss-info-grid">
        <Info label="Limit" value={policy.limit} />
        <Info label="Expires" value={formatLongDate(policy.expires)} />
        <Info label="Documents" value={`${policy.documents.length} verified`} />
        <Info label="Carrier" value={policy.carrier} />
      </div>

      <div className={`ss-note ${isCritical ? "danger" : ""}`}>
        <AlertTriangle size={16} />
        <span>{policy.statusNote}</span>
      </div>

      <Section
        title="Verified documents"
        sub={`${policy.documents.length} files`}
      />
      {policy.documents.map((doc) => (
        <DocumentRow key={doc} name={doc} />
      ))}

      <div className="ss-row">
        <button
          className="ss-button"
          onClick={onRenew}
          disabled={isRenewing || isShopping}
        >
          {isRenewing ? (
            <>
              <Spinner /> Renewing…
            </>
          ) : (
            <>
              <Zap size={16} /> Renew now
            </>
          )}
        </button>
        <button
          className="ss-button soft"
          onClick={onShop}
          disabled={isShopping || isRenewing}
        >
          {isShopping ? (
            <>
              <Spinner /> Shopping rates…
            </>
          ) : (
            <>Lower bill</>
          )}
        </button>
        <button className="ss-button soft" onClick={onSend}>
          <Send size={16} /> Send
        </button>
      </div>
    </div>
  );
}

function DocumentRow({ name }) {
  return (
    <div className="ss-doc">
      <span className="ss-pdf" aria-hidden="true">PDF</span>
      <div className="ss-doc-body">
        <b>{name}</b>
        <small>Original carrier-issued document · verified</small>
      </div>
      <em className="ss-verified">
        <Check size={13} /> Verified
      </em>
    </div>
  );
}
