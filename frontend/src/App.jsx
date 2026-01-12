import { useEffect, useMemo, useState } from "react";
import { fetchServices } from "./api";
import "./App.css";

function pillClass(value) {
  if (value === "HEALTHY" || value === "STABLE") return "pill pill-green";
  if (value === "DEGRADED" || value === "DEPLOYING") return "pill pill-yellow";
  if (value === "UNHEALTHY" || value === "FAILED") return "pill pill-red";
  return "pill";
}

export default function App() {
  const [services, setServices] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const data = await fetchServices();
      setServices(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 15000); // refresh every 15s
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return services;
    return services.filter(s => (s.serviceName || "").toLowerCase().includes(q));
  }, [services, query]);

  const summary = useMemo(() => {
    const total = services.length;
    const healthy = services.filter(s => s.healthStatus === "HEALTHY").length;
    const unhealthy = services.filter(s => s.healthStatus === "UNHEALTHY").length;
    const degraded = services.filter(s => s.healthStatus === "DEGRADED").length;
    return { total, healthy, degraded, unhealthy };
  }, [services]);

  return (
    <div className="page">
      <header className="header">
        <div>
          <h1>ReleaseWatch</h1>
          <p className="sub">ECS service health + deployment status (v1)</p>
        </div>

        <div className="actions">
          <input
            className="search"
            placeholder="Search service..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn" onClick={load} disabled={loading}>
            Refresh
          </button>
        </div>
      </header>

      <section className="cards">
        <div className="card">
          <div className="cardLabel">Total</div>
          <div className="cardValue">{summary.total}</div>
        </div>
        <div className="card">
          <div className="cardLabel">Healthy</div>
          <div className="cardValue">{summary.healthy}</div>
        </div>
        <div className="card">
          <div className="cardLabel">Degraded</div>
          <div className="cardValue">{summary.degraded}</div>
        </div>
        <div className="card">
          <div className="cardLabel">Unhealthy</div>
          <div className="cardValue">{summary.unhealthy}</div>
        </div>
      </section>

      {err && <div className="error">Error: {err}</div>}

      <section className="tableWrap">
        <table className="table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Health</th>
              <th>Deployment</th>
              <th>Desired</th>
              <th>Running</th>
              <th>Pending</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6">Loading…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="6">No services found.</td></tr>
            ) : (
              filtered.map((s) => (
                <tr key={s.serviceName}>
                  <td className="mono">{s.serviceName}</td>
                  <td><span className={pillClass(s.healthStatus)}>{s.healthStatus}</span></td>
                  <td><span className={pillClass(s.deploymentStatus)}>{s.deploymentStatus}</span></td>
                  <td>{s.desiredCount}</td>
                  <td>{s.runningCount}</td>
                  <td>{s.pendingCount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <footer className="footer">
        Backend: <span className="mono">{import.meta.env.VITE_API_BASE_URL}</span>
      </footer>
    </div>
  );
}
