import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Projects() {

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchProjects = async () => {

      try {

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`)

        console.log(res.data)

        setProjects(res.data)

      } catch (err) {

        console.error('ERROR FETCHING PROJECTS:', err)

      } finally {

        setLoading(false)

      }

    }

    fetchProjects()

  }, [])

  return (
    <section id="projects">

      <div className="section-header">
        <span className="section-number">// 02</span>

        <h2 className="section-title">
          Projects
        </h2>

        <div className="section-line" />
      </div>

      {loading ? (

        <p style={{ color: '#00f5ff' }}>
          Loading projects...
        </p>

      ) : (

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>

          {projects.map(project => (

            <div
              key={project._id}
              style={{
                background: '#080f1a',
                border: '1px solid rgba(0,245,255,0.15)',
                padding: '2rem',
                borderRadius: '12px'
              }}
            >

              <p style={{
                color: '#ff006e',
                fontSize: '0.7rem',
                marginBottom: '1rem'
              }}>
                {project.index}
              </p>

              <h3 style={{
                color: '#00f5ff',
                marginBottom: '1rem'
              }}>
                {project.name}
              </h3>

              <p style={{
                color: '#cbd5e1',
                lineHeight: '1.7'
              }}>
                {project.description}
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginTop: '1.5rem'
              }}>

                {project.stack.map((tech, i) => (

                  <span
                    key={i}
                    style={{
                      border: '1px solid rgba(0,245,255,0.2)',
                      padding: '0.3rem 0.8rem',
                      fontSize: '0.7rem',
                      color: '#00f5ff'
                    }}
                  >
                    {tech}
                  </span>

                ))}

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  )
}
