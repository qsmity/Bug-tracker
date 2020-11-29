import React, { useEffect } from 'react'
import * as mui from '@material-ui/core';
import * as FiIcons from 'react-icons/fi'
import * as IoIcons from 'react-icons/io'
import * as TicketActions from '../actions/ticketAction'
import { useDispatch, useSelector } from 'react-redux'

const TicketTable = ({ ticketsArray, disabled, hideEditTicketPopup }) => {
    const dispatch = useDispatch()

    const roleId = useSelector(state => state.session.role)

    //handle edit click
    const editTicket = (e) => {
        hideEditTicketPopup(e.currentTarget.dataset.name,
            e.currentTarget.dataset.descr,
            e.currentTarget.id,
            e.currentTarget.dataset.severitylevel,
            e.currentTarget.dataset.status,
            e.currentTarget.dataset.employeeid)
    }

    //re-render if ticket edited to show changes
    useEffect(() => {

    }, [ticketsArray])

    const deleteTicket = (e) => {
        //if disabled is true, don't allow unauthorized user to delete ticket
        if (disabled) {
            alert('Not permitted to delete tickets')
        } else {
            //popup window confirming delete action is valid
            if (window.confirm('Are you sure you wish to delete this item?')) {
                dispatch(TicketActions.deleteTicket(e.currentTarget.id))
            }
            return
        }
        return
    }

    return (
        <>
            <mui.TableContainer>
                <mui.Table>
                    <mui.TableHead>
                        <mui.TableRow>
                            <mui.TableCell>Name</mui.TableCell>
                            <mui.TableCell align='right' style={{paddingLeft: '50px', paddingRight: '0'}}>Description</mui.TableCell>
                            <mui.TableCell align='right' style={{paddingLeft: '50px', paddingRight: '0'}}>Severity Level</mui.TableCell>
                            <mui.TableCell align='center' style={{paddingRight: '0'}}>Status</mui.TableCell>
                            <mui.TableCell align='center'>Assigned Empoyee</mui.TableCell>
                            <mui.TableCell></mui.TableCell>
                            <mui.TableCell></mui.TableCell>
                        </mui.TableRow>
                    </mui.TableHead>
                </mui.Table>
                <div className='table-container' style={{ overflow: 'auto', height: '400px' }}>
                    <mui.Table>
                        <mui.TableBody>
                            {ticketsArray.map(ticket => {
                                return (
                                    <mui.TableRow key={ticket.id}>
                                        <mui.TableCell style={{maxWidth: '75px'}}>{ticket.name}</mui.TableCell>
                                        <mui.TableCell style={{maxWidth: '150px'}}>{ticket.description}</mui.TableCell>
                                        <mui.TableCell>{ticket.severityLevel}</mui.TableCell>
                                        <mui.TableCell>{ticket.status}</mui.TableCell>
                                        <mui.TableCell>{ticket.Employee}</mui.TableCell>
                                        {/* adding the dataset onto the div to populate the modal with selected ticket to edit */}
                                        <mui.TableCell>
                                            <div className='edit-icon-container' onClick={editTicket}
                                                id={ticket.id}
                                                data-name={ticket.name}
                                                data-descr={ticket.description}
                                                data-severitylevel={ticket.severityLevel}
                                                data-status={ticket.status}
                                                data-employeeid={ticket.employeeId}
                                                disabled={disabled}
                                            >
                                                <FiIcons.FiEdit2
                                                    className='edit-icon'
                                                />
                                            </div>
                                        </mui.TableCell>
                                        <mui.TableCell>
                                            {
                                                roleId !== 1 && roleId !== 2 ?
                                                    <IoIcons.IoIosTrash
                                                        className='delete-icon'
                                                        id={ticket.id}
                                                        disabled={true}
                                                        onClick={deleteTicket}
                                                        size='24'>
                                                        Delete
                                            </IoIcons.IoIosTrash>
                                                    :
                                                    <IoIcons.IoIosTrash
                                                        className='delete-icon'
                                                        id={ticket.id}
                                                        disabled={disabled}
                                                        onClick={deleteTicket}
                                                        size='24'>
                                                        Delete
                                            </IoIcons.IoIosTrash>

                                            }
                                        </mui.TableCell>

                                    </mui.TableRow>
                                )
                            })}

                        </mui.TableBody>
                    </mui.Table>
                </div>
            </mui.TableContainer>
        </>
    )
}

export default TicketTable; 