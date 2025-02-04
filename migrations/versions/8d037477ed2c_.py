"""empty message

Revision ID: 8d037477ed2c
Revises: 213fa003aa32
Create Date: 2025-01-15 18:37:02.589456

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8d037477ed2c'
down_revision = '213fa003aa32'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('especialistas', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint('especialistas_users_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])
        batch_op.drop_column('users_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('especialistas', schema=None) as batch_op:
        batch_op.add_column(sa.Column('users_id', sa.INTEGER(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('especialistas_users_id_fkey', 'users', ['users_id'], ['id'])
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###
