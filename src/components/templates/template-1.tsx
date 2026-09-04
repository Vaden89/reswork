import type { TemplateData } from '#/types/template.type'
import { capitalizeFirst } from '#/utils/string'
import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'

export const Template1 = ({ data }: { data: TemplateData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>
            {data.first_name} {data.last_name}
          </Text>
          <View style={styles.generalInfo}>
            <Text>{data.location} · </Text>
            <Text> {data.email} ·</Text>
            <Text> {data.phone} ·</Text>
            {data.links.length > 0 && (
              <View style={{ gap: 4, flexDirection: 'row' }}>
                {data.links.map((link, idx) => (
                  <Link href={link.url}>{link.label}</Link>
                ))}
              </View>
            )}
          </View>
        </View>

        {data.skills.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text>SKILLS</Text>
            </View>
            <View style={styles.skillSection}>
              {data.skills.map((skill, index) => (
                <View style={styles.subSkillSection} key={index}>
                  <Text style={styles.skillName}>
                    {capitalizeFirst(skill.skill_name)}:{' '}
                  </Text>
                  <View style={styles.subSkillContainer}>
                    {skill.sub_skills.map((subSkill, subIndex) => (
                      <Text key={subIndex}>
                        {subSkill}
                        {subIndex !== skill.sub_skills.length - 1 ? ', ' : ''}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.workExperience.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text>WORK EXPERIENCE</Text>
            </View>
            <View style={styles.workExperienceSection}>
              {data.workExperience.map((experience, index) => (
                <View key={index} style={styles.workExperienceContainer}>
                  <View style={styles.workExperienceMetaData}>
                    <Text style={styles.companyName}>{experience.company}</Text>
                    <Text>{experience.location}</Text>
                  </View>
                  <View style={styles.workExperienceMetaData}>
                    <Text>{experience.position}</Text>

                    <Text>
                      {experience.start_date} - {experience.end_date}
                    </Text>
                  </View>
                  <View style={styles.responsibilitiesSection}>
                    {experience.responsibilities.map(
                      (responsibility, respIndex) => (
                        <View
                          key={respIndex}
                          style={styles.bulletItem}
                          wrap={false}
                        >
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.bulletText}>
                            {responsibility}
                          </Text>
                        </View>
                      ),
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.projects.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text>PROJECTS</Text>
            </View>
            <View style={styles.projectContainer}>
              {data.projects.map((project, index) => (
                <View key={index} style={styles.projectSection}>
                  <View style={styles.projectMetaData}>
                    <View style={styles.projectHeaderSection}>
                      <Text style={styles.projectName}>{project.name} - </Text>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {project.technologies.length > 0 &&
                          project.technologies.map((item, index) => (
                            <Text>
                              {item}
                              {index < project.technologies.length - 1
                                ? ', '
                                : ''}
                            </Text>
                          ))}
                      </View>
                    </View>
                    {project.live_url && (
                      <Link href={project.live_url}>{project.live_url}</Link>
                    )}
                  </View>
                  <View>
                    <Text>{project.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.education.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text>EDUCATION</Text>
            </View>
            <View style={styles.projectContainer}>
              {data.education.map((education, index) => (
                <View key={index} style={styles.projectSection}>
                  <View style={styles.projectMetaData}>
                    <Text style={{ fontWeight: 'bold' }}>
                      {education.school}
                    </Text>
                    <Text>{education.location}</Text>
                  </View>
                  <View style={styles.projectMetaData}>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                      <Text>
                        {education.degree_type} {education.course}
                      </Text>
                      {education.gpa && <Text>GPA: {education.gpa}</Text>}
                    </View>
                    <Text>
                      {education.start_date} - {education.end_date}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    fontFamily: 'Times-Roman',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  generalInfo: {
    flexDirection: 'row',
    fontSize: 10,
    gap: 1,
  },
  section: {
    marginTop: 10,
  },
  sectionHeader: {
    fontSize: 11,
    width: '100%',
    paddingBottom: 2,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderBottomStyle: 'solid',
  },
  skillSection: {
    marginLeft: 10,
    gap: 2,
  },
  subSkillSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  skillName: {
    width: 70,
    flexShrink: 0,
  },
  subSkillContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 1,
    flexWrap: 'wrap',
  },
  workExperienceSection: {
    marginLeft: 10,
    gap: 6,
  },
  workExperienceContainer: {
    marginTop: 4,
  },
  companyName: {
    fontWeight: 'bold',
  },
  workExperienceMetaData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  responsibilitiesSection: {
    marginTop: 5,
    marginLeft: 10,
    gap: 2,
  },
  bulletItem: {
    flexDirection: 'row',
    gap: 4,
  },
  bullet: {
    width: 8,
    flexShrink: 0,
  },
  bulletText: {
    flex: 1,
  },
  projectSection: {
    marginLeft: 10,
    gap: 2,
  },
  projectContainer: {
    marginLeft: 10,
    flexDirection: 'column',
    gap: 5,
  },
  projectName: {
    fontWeight: 'bold',
    fontStyle: 'normal',
    marginRight: 2,
  },
  projectMetaData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  projectHeaderSection: {
    flexDirection: 'row',
    gap: 2,
    fontStyle: 'italic',
    alignItems: 'flex-start',
  },
  projectDescription: {
    lineHeight: 5,
    marginTop: 10,
  },
})
