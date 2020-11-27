import React from 'react'
import * as mui from '@material-ui/core';
import * as FiIcons from 'react-icons/fi'
import * as IoIcons from 'react-icons/io'

const TicketTable = ({ ticketsArray, disabled, hidePopup }) => {
    console.log('ticketsArray inside ticket table', ticketsArray)
    //handle edit click
    const editTicket = (e) => {
        console.log('target', e.currentTarget)
        console.log(e.currentTarget.dataset.name)
        console.log(e.currentTarget.dataset.descr)
        console.log(e.currentTarget.id)
        hidePopup(e.currentTarget.dataset.name, e.currentTarget.dataset.descr, e.currentTarget.id)
    }

    return (
        <>
            <mui.TableContainer>
                <mui.Table>
                    <mui.TableHead>
                        <mui.TableRow>
                            <mui.TableCell>Name</mui.TableCell>
                            <mui.TableCell>Description</mui.TableCell>
                            <mui.TableCell>Severity Level</mui.TableCell>
                            <mui.TableCell>Status</mui.TableCell>
                            <mui.TableCell>Assigned Empoyee</mui.TableCell>
                            <mui.TableCell></mui.TableCell>
                            <mui.TableCell></mui.TableCell>
                        </mui.TableRow>
                    </mui.TableHead>
                    <mui.TableBody>
                        {ticketsArray.map(ticket => {
                            return (
                                <mui.TableRow key={ticket.id}>
                                    <mui.TableCell>{ticket.name}</mui.TableCell>
                                    <mui.TableCell>{ticket.description}</mui.TableCell>
                                    <mui.TableCell>{ticket.severityLevel}</mui.TableCell>
                                    <mui.TableCell>{ticket.status}</mui.TableCell>
                                    <mui.TableCell>{ticket.Employee}</mui.TableCell>
                                    <mui.TableCell>
                                        <div className='edit-icon-container' onClick={editTicket} 
                                         id={ticket.id}
                                         data-name={ticket.name}
                                         data-descr={ticket.description}
                                         disabled={disabled}
                                        >
                                            <FiIcons.FiEdit2
                                                className='edit-icon'
                                            />
                                        </div>
                                    </mui.TableCell>
                                    <mui.TableCell>
                                        <IoIcons.IoIosTrash
                                            className='delete-icon'
                                            id={ticket.id}
                                            disabled={disabled}
                                            onClick={e => console.log('delete')}
                                            size='24'>
                                            Delete
                                            </IoIcons.IoIosTrash>
                                    </mui.TableCell>

                                </mui.TableRow>
                            )
                        })}

                    </mui.TableBody>
                    {/* </div> */}
                </mui.Table>
            </mui.TableContainer>
        </>
    )
}

export default TicketTable; 