import React from 'react'
import * as mui from '@material-ui/core';



const TicketTable = ({ ticketsArray, disabled, hidePopup }) => {
    console.log('ticketsArray inside ticket table', ticketsArray)
    //handle edit click
    const editTicket = (e) => {
        console.log(e.target.dataset.name)
        console.log(e.target.dataset.descr)
        console.log(e.target.id)
        hidePopup(e.target.dataset.name, e.target.dataset.descr, e.target.id)
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
                </mui.Table>
                <div style={{ overflow: 'auto', height: '300px'}}>
                    <mui.Table size="small" aria-label="a dense table">
                        <mui.TableBody>
                            {ticketsArray.map(ticket => {
                                return (
                                        <mui.TableRow key={ticket.id}>
                                            <mui.TableCell>{ticket.name}</mui.TableCell>
                                            <mui.TableCell>{ticket.description}</mui.TableCell>
                                            <mui.TableCell>{ticket.severityLevel}</mui.TableCell>
                                            <mui.TableCell>{ticket.status}</mui.TableCell>
                                            <mui.TableCell>{ticket.Employee}</mui.TableCell>
                                            <mui.TableCell><mui.Button id={ticket.id} disabled={disabled}>Delete</mui.Button></mui.TableCell>
                                            <mui.TableCell><mui.Button onClick={editTicket} disabled={disabled}><div id={ticket.id} data-name={ticket.name} data-descr={ticket.description}>Edit</div></mui.Button></mui.TableCell>
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