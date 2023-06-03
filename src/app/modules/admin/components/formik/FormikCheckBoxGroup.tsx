import {useFormikContext} from 'formik'
import clsx from 'clsx'
import {useEffect} from 'react'
interface OPtion {
  permissions: any[]
  id: number
  name: string
}
interface props {
  title: string
  name: string
  type?: string
  options: OPtion[]
  group: string
}

const FormikCheckBoxGroup = (props: props) => {
  const {title, name, type, options, group} = props
  const {errors, touched, values, setFieldValue} = useFormikContext()
  return (
    <>
      <h3>{group}</h3>
      <div className='accordion' id='kt_accordion_1'>
        {options.map((group) => {
          return (
            <div className='accordion-item'>
              <h2 className='accordion-header' id={`kt_accordion_${group.id}_header_${group.id}`}>
                <button
                  className='accordion-button fs-4 fw-bold collapsed'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#kt_accordion_1_body_1'
                  aria-expanded='false'
                  aria-controls='kt_accordion_1_body_1'
                >
                  {group?.name}
                </button>
              </h2>
              {/* <div className='separator separator-dashed my-5'></div> */}
              <div
                id='kt_accordion_1_body_1'
                className='accordion-collapse collapse show'
                aria-labelledby={`kt_accordion_${group.id}_header_${group.id}`}
                data-bs-parent='#kt_accordion_1'
              >
                <div className='accordion-body'>
                  <div className='row'>
                    {group.permissions.map((item) => {
                      return (
                        <div className='mb-10 col-md-2'>
                          <div className='form-check form-check-custom form-check-solid'>
                            <input
                              type='checkbox'
                              id={`flexCheckDefault-${item.id}`}
                              className={clsx(
                                'form-check-input w-30px h-30px'
                                // {'is-invalid': touched[name] && errors[name]},
                                // {
                                //   'is-valid': touched[name] && !errors[name],
                                // }
                                // "roles_id":1,
                                // "permissions":[1]
                              )}
                              checked={values[name]
                                ?.find((x) => x.id == group.id)
                                ?.permissions.includes(item.id)}
                              //   defaultChecked={values[name]}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  if (values[name]?.length > 0) {
                                    let roles = values[name]
                                    var index = roles?.findIndex((x) => x?.role_id == group.id)
                                    var tempRole = roles?.find((x) => x?.role_id == group.id)

                                    if (tempRole) {
                                      let temp = tempRole.permissions
                                      temp.push(item.id)
                                      tempRole.permissions = temp
                                      roles[index] = tempRole
                                      setFieldValue(name, roles)
                                    } else {
                                      roles.push({
                                        role_id: group.id,
                                        permissions: [item.id],
                                      })
                                      setFieldValue(name, roles)
                                    }
                                  } else {
                                    let temp = [{role_id: group.id, permissions: []}]
                                    temp[0].permissions.push(item.id)

                                    setFieldValue(name, temp)
                                  }
                                } else {
                                  let roles = values[name]

                                  let index = roles?.findIndex((x) => x.role_id == group.id)
                                  let role = roles[index]
                                  let temp = role?.permissions
                                  role.permissions = temp.filter((x) => x != item.id)
                                  if (role.permissions.length > 0) {
                                    roles[index] = role
                                    setFieldValue(name, roles)
                                  } else {
                                    setFieldValue(
                                      name,
                                      roles.filter((x) => x.role_id != group.id)
                                    )
                                  }
                                }
                              }}
                            />
                            {touched[name] && errors[name] && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                  <span role='alert'>{errors[name]}</span>
                                </div>
                              </div>
                            )}
                            <label
                              className='form-check-label'
                              htmlFor={`flexCheckDefault-${item.id}`}
                            >
                              {item?.name}
                            </label>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default FormikCheckBoxGroup
